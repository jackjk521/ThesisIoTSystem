import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router'

function Protected() {
    let navigate = useNavigate()
    
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token) // for testing

        axios.get("http://localhost:3001/protected", {
            headers : {
                Authorization : token,
            }
        }).then(res =>  {
            console.log(res)
        }).catch(err => {
            console.log(err)
            navigate('/')
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/displayUsers", {
        }).then(res =>  {
            setUserList(res.data.users);
            console.log(res.data.users)
        }).catch(err => {
            console.log(err)
            navigate('/')
        })
    }, [])
   
    return (
        <div>
            <h1> Protected </h1>
            {userList.map((user, index) => (
                <ul key = {index}>
                    <li>
                        {user.name}
                    </li>
                    <li >
                        {user.email}
                    </li>
                </ul>
            ))}

        </div>
    )
}

export default Protected