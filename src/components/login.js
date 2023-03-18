import '../assets/css/login.css'

import { useRef } from 'react'
import { ref, onValue } from 'firebase/database'
import { Link, useNavigate } from 'react-router-dom'

import db from '../firebase'

const Login = () => {
    const unameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const validateUser = () => {
        const userObjs = []
        const keys = []
        const query = ref(db, "tasks")
        onValue(query, (snapshot) => {
            snapshot.forEach(el => {
                userObjs.push(el.val())
                keys.push(el.key)
            })
        })
        if(userObjs.filter(ch => ch.fname === unameRef.current.value).length > 0){
            const usr = userObjs.filter(ch => ch.fname === unameRef.current.value)[0]
            const index = userObjs.findIndex((el) =>  el === usr)
            if(usr.pass === passRef.current.value){
                localStorage.setItem('key', keys.filter((key, i) => i == index)[0])
                navigate("/", {replace : true})
            }
        }
    }

    return (
        <div className='login-wrapper'>
            <div className='login-card'>
                <label className='header-text'>LOGIN</label>
                <input className='usrNameInput' placeholder='User Name' ref={unameRef}/>
                <input className='passwordInput' placeholder='Password' ref={passRef}/>
                <button className='login-button' onClick={validateUser}>Submit</button>
                <label style={{ fontSize: '11px', color:'white', marginTop: '50px' }} onClick={() => navigate('/signup')}>New user?</label>
            </div>
        </div>
    )
}

export default Login