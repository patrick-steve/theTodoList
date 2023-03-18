import '../assets/css/signup.css'

import { useRef } from 'react'
import { ref, push } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import plusIcon from '../assets/images/plus.png'

import db from '../firebase'

const Login = () => {
    const unameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const addUser = () => {
        const newUser = push(ref(db, "tasks"), {
            fname: unameRef.current.value,
            pass: passRef.current.value,
            todos: {
                "0": "Default"
            }
        })
        navigate("/login", { replace: true })
    }

    return (
        <div className='signup-wrapper'>
            <div className='signup-card'>
                <label className='header-text'>SIGN UP</label>
                <input className='usrNameInput' placeholder='User Name' ref={unameRef}/>
                <input className='passwordInput' placeholder='Password' ref={passRef}/>
                <button className='signup-button' onClick={addUser}>Add <img src={plusIcon}  alt="plus" style={{ width:"10px", height:"10px" }}/></button>
                <label style={{ fontSize: "12px", color: 'white', marginTop: '50px' }} onClick={() => navigate('/login')}>Already a user?</label>
            </div>
        </div>
    )
}

export default Login