import axios from 'axios';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import LoginRegister from './LoginRegister'
import Protected from './Protected'

function Main() {
    return (
        <BrowserRouter>
            <div className="Main">
                <div className='Menu'>
                    {/* <span className='Menu'> <Link to="/"> Home </Link></span> */}
                    {/* <span className='Menu'> <Link to="/dashboard"> Dashboard </Link></span> */}
                </div>
                <Routes>
                    {/* <Route path="/" element = {<Login/>}/> */}
                    <Route path="/dashboard" element = {<Dashboard/>}/>
                    <Route path="/" element = {<LoginRegister/>}/> 
                    <Route path="/protected" element = {<Protected/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
