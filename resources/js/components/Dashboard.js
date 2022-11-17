import axios from "axios";
import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Things from './Things';
import '../../css/dashboard.css';
import MessageQueue, { useMessageQueue } from "./MessageQueue";
import mqtt from "mqtt";

const Main = () => {
  const navigate = useNavigate();
  const [things, setThings] = useState([]);
  const [thingName, setThingName] = useState('');
  const [thingType, setThingType] = useState('led');
  const { addMessage, removeMessage, messages } = useMessageQueue();
  const client = mqtt.connect("ws://34.209.25.168:9001", {   // replace the IP with your AWS instance public IP address
    username: "admin",  // your broker username
    password: "admin",   // your broker password
  }); 
  const localhost = 'http://127.0.0.1:8000/api';
  const proxy = 'http://localhost:8080';
  // const bearer = localStorage.getItem('token');

  const thingNameHandler = (e) => {
    setThingName(e.target.value);
  }

  const thingTypeHandler = (e) => {
    setThingType(e.target.value);
  }

  const addThing = async () => {
    const thing = {
      'name' : thingName,
      'led' : 'null',
      'sound' : 'null',
      'temp' : 'null',
      'motion' : 'null',
      'heart' : 'null',
      'user_id' : sessionStorage.getItem('user_id')
    }

    thing[thingType] = '-1';
    console.log(thing)
    const res = await axios.post(`${proxy}/${localhost}/addThing`, thing);
    if(res.data.status == 200) {
      addMessage(res.data.message, 'success');
      let current = things;
      current.push(res.data.data);
      setThings([...current]);
    } else {
      addMessage(res.data.message, 'error');
    }
  }

  // const logOut = () => {
  //   const access_token = sessionStorage.getItem('access_token');
  //   sessionStorage.clear();
  //   sessionStorage.setItem('access_token', access_token);
  //   navigate('/');
  // } 

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  } 

  useEffect(async () => {
    const token = localStorage.getItem('token');
    console.log(token) // for testing

    axios.get("http://localhost:3001/dashboard", {
        headers : {
            Authorization : token,
        }
    }).then(res =>  {
        console.log(res)
    }).catch(err => {
        console.log(err)
        navigate('/')
    })

    const req = {
      params : {
        user_id : sessionStorage.getItem('user_id')
      }
    };
    const res = await axios.get(`${proxy}/${localhost}/getThings`, req);
    const thingList = res.data;

    const sensors = ['sound', 'temp', 'motion', 'heart'];
    thingList.map(thing => {
      sensors.forEach((sensor) => {
        if(thing[sensor] != 'null') {
          client.subscribe(`${thing.name}/${sensor}`);
          console.log(`subscribed to ${thing.name}/${sensor}`);
        }
      });
    });

    client.on('message', async function(topic, message) {
      const topicArr = topic.split('/');
      const res = await axios.get('findThing', {params: {'name' : topicArr[0]}});
      if(res.data.status == 200) {
        const update = await axios.patch('updateThing', {'name' : topicArr[0], 'sensor' : topicArr[1], 'value' : message});
      }
      let current = things;
      current.find(thing => thing.name === topicArr[0])[topicArr[1]] = message;
      setThings([...current]);
    });

    setThings(thingList);
  }, []);

  //added to avoid loginging in again after being authenticated
    useEffect(() => {
      const token = localStorage.getItem('token');
          axios.get("http://localhost:3001/dashboard", {
            headers : {
                Authorization : token,
            }
          }).then(res =>  {
              console.log(res)
              navigate('/dashboard')
          }).catch(err => {
              console.log(err)
              navigate('/')
          })
    }, [])


  return (
    <div className="Dashboard">
        <div className="form-thing-info">
          <input type='text' name='thingName' onChange={thingNameHandler} placeholder='Thing Name Here' />
          <label> Thing type: </label>
          <select className='thingType' value={thingType} onChange={thingTypeHandler}>
            <option value='led'> Light </option>
            <option value='sound'> Sound </option>
            <option value='temp'> Temperature </option>
            <option value='motion'> Motion </option>
            <option value='heart'> Heart Rate </option>
          </select>
          <button type='button' onClick={addThing} className='add-button'> Create Thing </button>
        </div>

        <MessageQueue messages={messages} removeMessage={removeMessage} />
        <button type='button' onClick={logOut} className='logout-btn' > Logout </button>
        <Things things = {things} setThings = {setThings} />
    </div> 
    );
};

export default Main;