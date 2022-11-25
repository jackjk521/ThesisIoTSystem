import axios from "axios";
import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Things from './Things';
import '../../css/dashboard.css';
import MessageQueue, { useMessageQueue } from "./MessageQueue";
import mqtt from "mqtt";

const Main = () => {
  const navigate = useNavigate();
  const [test, setTest] = useState([])
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
  let config = {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }

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
    // console.log(token) // for testing

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
    // console.log(`userId: ${sessionStorage.getItem('user_id')}`)
    const req = {
      params : {
        user_id : sessionStorage.getItem('user_id')
      }
    };
    const res = await axios.get(`${proxy}/${localhost}/getThings`, req, config);
    const thingList = res.data;
    console.log(thingList)
    setThings(thingList);

    const sensors = ['led', 'sound', 'temp', 'motion', 'heart'];
    thingList.map(thing => {
      sensors.forEach((sensor) => {
        if(thing[sensor] != 'null') {
          client.subscribe(`/${thing.name}/${sensor}`);
          console.log(`subscribed to /${thing.name}/${sensor}`);
        }
      });
    });
  }, []);

  useEffect(async () => {
    const fun = async (topic, message) => {
      const topicArr = topic.split('/');
      const name = topicArr[1]
      const sensor = topicArr[2]
      const res = await axios.get(`${proxy}/${localhost}/findThing`, {params: {'name' : topicArr[1]}});
      const msg = message.toString()
      if(res.data.status == 200) {
        await axios.patch(`${proxy}/${localhost}/updateThing` , {'name' : topicArr[1], 'sensor' : topicArr[2], 'value' : msg});
      }
      setTest({name, sensor, msg})
    }

    client.on('message', fun );
  }, []);

  useEffect(() => {
    console.log(test.msg)
    let current = things 
    let x = current.find(thing => test.name === thing.name)
    console.log(x)
    if(x) {
      x[test.sensor] = test.msg
      setThings([...things])
    }
  }, [test]);

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
        <Things things = {things} setThings = {setThings} client = {client} />
    </div> 
    );
};

export default Main;