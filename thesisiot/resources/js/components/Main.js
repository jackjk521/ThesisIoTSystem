import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import LoginRegister from './LoginRegister'
import Dashboard from './Dashboard'



export default function Main() {
   
    return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element = {<LoginRegister/>}/> 
                        <Route path="/dashboard" element = {<Dashboard/>}/>

                    </Routes>
                </div>
            </BrowserRouter>
    

    );
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
