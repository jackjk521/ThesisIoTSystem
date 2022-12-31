import axios from 'axios';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function Main() {
    return (
        <BrowserRouter>
            <div className="Main">
                <Routes>
                    <Route path="/" element = {<Login/>}/>
                    <Route path="/dashboard" element = {<Dashboard/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
