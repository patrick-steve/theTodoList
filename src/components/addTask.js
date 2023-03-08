import '../assets/css/addTask.css'

import { useRef } from 'react'
import { ref, push } from 'firebase/database'

import addIcon from '../assets/images/add.png'
import submitIcon from '../assets/images/submit.png'
import backIcon from '../assets/images/previous.png'

import db from '../firebase'


const AddListCard = (props) => {
    const taskNameRef = useRef()

    const handleAdd = () => {
        push(ref(db, "tasks"), taskNameRef.current.value)
        alert(taskNameRef.current.value+" has been added successfully!")
    }

    const handlePageChange = () => {
        props.changePage(0)
    }

    return (
        <>
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
            <img className="back" src={ backIcon } alt="back" onClick={handlePageChange}/>
        </>
    )
}

export default AddListCard