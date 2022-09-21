import axios from 'axios';
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router'

function Protected() {
    let navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token) // for testing

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

    return (
        <div>
            <h1> Protected </h1>
        </div>
    )
}

export default Protected