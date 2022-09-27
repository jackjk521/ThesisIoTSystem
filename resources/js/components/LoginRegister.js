import React , {useState, useEffect} from "react";
import "../../css/LoginRegister.css";
import api from "../api/api";
import axios from "axios";
import {useNavigate} from 'react-router-dom';   

const LoginRegister = () => {
  const[addClass, setAddClass] = useState("");
  const navigate = useNavigate();

  const [Info, setInfo] = useState({
    name:'',
    email:'',
    password:'',
  });

  const handleInput = (e) =>{
    const {name, value} = e.target;

    setInfo(prevState =>({
        ...prevState,
        [name] : value
    }))
}

//added to avoid loginging in again after being authenticated
useEffect(() => {
  const token = localStorage.getItem('token');
  console.log(token)

  axios.get("http://localhost:3001/protected", {
      headers : {
          Authorization : token,
      }
  }).then(res =>  {
      console.log(res)
      navigate('/protected')
  }).catch(err => {
      console.log(err)
      navigate('/')
  })
}, [])


  const signUp = async (e) =>{
    e.preventDefault();

    try{
      // const res = await api.signUp(Info);
      const res = await axios.post("http://localhost:3001/register", Info);
      console.log(res);
      
      if(res.data.status === ("success"))
      {
         setInfo({
            name:'',
            email:'',
            password:'',
          });
         
      }
      else{
            console.log(res);
      }
    }
    catch(err){
      if( err.response.status === 422){
        console.log(err.response.data.errors);
      }   
    }
   
  }

  const login = async (e) =>{
    e.preventDefault();

    try{
      const res = await axios.post("http://localhost:3001/login", Info);
      
      if(res.data.success === ("true")){
          setInfo({
            email: '',
            password: '',
      });
        const localToken = localStorage.setItem('token', res.data.token); 
        // console.log(localStorage.getItem('token')); //check if works

        navigate('/protected') // navigate to the protected page

      }
    
    }
    catch(err){
      console.log(err);
    }
  }

  return (
        <div className= "loginBody">
          <div className={`container ${addClass}`} id="container">
            <div className="form-container sign-up-container">
              
              <form className="LRForm" onSubmit = {signUp}>
                <h1 className="header1">Create Account</h1>
                <input className ="inputBox" name = 'name' type="text"  onChange={handleInput} value={Info.name || ""} placeholder="John Doe" />
                <input className ="inputBox" name = 'email' type="email" onChange={handleInput} value={Info.email || ""}   placeholder="EMAIL" />
                <input className ="inputBox"  name = 'password' type="password" onChange={handleInput} value={Info.password || ""}  placeholder="PASSWORD" />
                <button className="loginRegbuttons" type="submit"> REGISTER </button>
              </form>
            
            </div>
            <div className="form-container sign-in-container">
              
              <form className="LRForm" onSubmit={login}>
                <h1 className="header1">Login</h1>
                <input className ="inputBox" name = 'email' type="email" onChange={handleInput} value={Info.email || ""} placeholder="EMAIL" />
                <input className ="inputBox" name = 'password' type="password" onChange={handleInput} value={Info.password || ""} placeholder="PASSWORD" />
                <button className="loginRegbuttons" type="submit" > LOGIN </button>
              </form>
            
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <button className="loginRegbuttons ghost" id="signIn" onClick= {()=> setAddClass("")}>
                    GO TO LOGIN
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <button className="loginRegbuttons ghost" id="signUp" onClick= {()=> setAddClass("right-panel-active")}>
                      GO TO REGISTER
                  </button>
                </div>
                </div>
            </div>
          </div>
      </div>
    );
};
export default LoginRegister;