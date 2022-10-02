import React , {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import '../../css/Login.css';
import axios from 'axios';
import MessageQueue, { useMessageQueue } from "./MessageQueue";

const Login = () => {
    const { addMessage, removeMessage, messages } = useMessageQueue();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username : '',
        password : ''
    });

    const onInput = (e) => {
        const {name, value} = e.target;
        setCredentials(current => ({
            ...current, 
            [name] : value
        }))
    }

    const signUp = async (e) =>{
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/signUp', credentials);
        if(res.data.status === 200) {
            addMessage(res.data.data, 'success');
            setCredentials({
            username : '',
            password : ''
            });
        } else{
            addMessage(res.data.data, 'error');
        }
    }

    const signIn = async (e) =>{
        e.preventDefault();
    
        const res = await axios.post('http://127.0.0.1:8000/api/signIn', credentials);

        if(res.data.status === 200) {
            sessionStorage.setItem('user_id', res.data.data);
            setCredentials({
                username: '',
                password: '',
            });

            navigate("/dashboard");
        } else {
            addMessage(res.data.message, 'error');
        } 
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
        
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    return (
        <div className="Login">
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={signUp}>
                        <h1>Create Account</h1>
                        <input name="username" type="text" onChange={onInput} value={credentials.username} placeholder="Username" />
                        <input name="password" type="password" onChange={onInput} value={credentials.password} placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={signIn}>
                        <h1>Sign in</h1>
                        <input name="username" type="text" onChange={onInput} value={credentials.username} placeholder="Username" />
                        <input name="password" type="password" onChange={onInput} value={credentials.password} placeholder="Password" />
                        {/* <a href="#">Forgot your password?</a> */}
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
};
export default Login;