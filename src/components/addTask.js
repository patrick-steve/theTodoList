import '../assets/css/addTask.css'

import { useEffect, useRef } from 'react'
import { ref, push } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import addIcon from '../assets/images/add.png'
import submitIcon from '../assets/images/submit.png'
import backIcon from '../assets/images/previous.png'

import db from '../firebase'

const AddListCard = (props) => {
    const taskNameRef = useRef()
    const navigate = useNavigate()

    const checkUserValidation = () => {
        if(localStorage.getItem("key")) { 
            console.log("User is validated !!")
            return localStorage.getItem("key")
        }
        else { navigate('/login', { replace: true }) }
    }

    useEffect(() => {
        checkUserValidation()
    }, [])

    const handleAdd = () => {
        push(ref(db, "tasks/"+ localStorage.getItem("key") +"/todos"), taskNameRef.current.value)
        alert(taskNameRef.current.value+" has been added successfully!")
        taskNameRef.current.value = ''
    }

    return (
        <div className='App'>
        <div className='wrapper'>
            <div className='card'>
                <div className='card-header'>
                    Add Task <img className="imageicon" src={ addIcon } alt="add"/>
                </div>
                <div className='card-body'>
                    <input type="text" placeholder='Enter Task Name' className='tskName' ref={taskNameRef}/>
                </div>
                <div className='card-footer'>
                    <img className='imagebutton' src={submitIcon} alt="submit" onClick={handleAdd} />
                </div>
            </div>
            <img className="back" src={ backIcon } alt="back" onClick={() => navigate('/', { replace: false})}/>
        </div>
        </div>
    )
}

export default AddListCard