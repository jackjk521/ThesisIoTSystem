import React , {useState} from "react";
import "../../css/LoginRegister.css";
import api from "../api/api";
import axios from "axios";
import {useNavigate} from 'react-router-dom';   

const LoginRegister = () => {
  const[addClass, setAddClass] = useState("");
  const navigate = useNavigate();

  const [Info, setInfo] = useState({
    firstname:'',
    lastname:'',
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

  const signUp = async (e) =>{
    e.preventDefault();

    try{
      // const res = await api.signUp(Info);
      const res = await axios.post("http://localhost:3001/register", Info);

      axios.post("http://localhost:3001/register", {
                  params:({
                    firstname: Info.lastname,
                    lastname: Info.lastname,
                    email: Info.email,
                    password: Info.password
                    }).then(response => {
                      console.log(response);
                    })
                  });

      if(res)
      {
        console.log(res);
         setInfo({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
          });
      }
      else{
            console.log(res);
      }
    }
    catch(err){
            console.log(err);
    }
   
  }

  const login = async (e) =>{
    e.preventDefault();

    try{
      const res = await axios.post("http://localhost:3001/login", Info);
      // const res = await axios.post("http://localhost:3001/login", {
      //                               params:{
      //                                 email: Info.email,
      //                                 password: Info.password
      //                               }    
      //                             });

      
          setInfo({
              email: '',
              password: '',
          });
          navigate('/dashboard');    
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
                <input className ="inputBox" name = 'firstname' type="text"  onChange={handleInput} value={Info.firstname || ""} placeholder="FIRST NAME" />
                <input className ="inputBox" name = 'lastname' type="text"  onChange={handleInput} value={Info.lastname || ""} placeholder="LAST NAME" />
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