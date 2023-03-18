import { useEffect, useState } from 'react'
import { onValue, ref, remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import '../assets/css/viewTask.css'
import addTaskIcon from '../assets/images/button.png'
import delIcon from '../assets/images/trash.png'
import logoutIcon from '../assets/images/logout.png'

import db from '../firebase'

const ViewTask = (props) => {
    const [todoList, setTodoList] = useState([])
    const navigate = useNavigate()

    const checkUserValidation = () => {
        if(localStorage.getItem("key")) { 
            console.log("User is validated !!")
            return localStorage.getItem("key")
        }
        else { navigate('/login', { replace: true }) }
    }

    useEffect(() => {
        const key = checkUserValidation()
        const query = ref(db, "tasks/"+key+"/todos")
        onValue(query, (snapshot) => {
            let tasks = []
            snapshot.forEach(element => {
                if(element.val() !== "Default") tasks.push({ id: element.key, value: element.val() })
            })
            setTodoList(tasks)
        })

    }, [])

    const handleDelete = (id) => {
        const newList = todoList.filter((el, i) => i !== id)
        setTodoList(newList)
    }

    return (
        <div className='container'>
            <div className='wrapper'>
            <h1>Works to do ... </h1>
            <table className='list'>
                <thead>
                    <tr>
                        <th>Sn.</th>
                        <th>Task Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoList.map((el, i) => {
                            return (
                                <TaskElement value={el.value} id={i} fid={el.id} deleteTask={handleDelete} key={i}/>
                            )
                        })
                    }
                </tbody>
            </table>
            <h2>Tasks Remaining : {todoList.length}</h2>
            </div>
            <div className="logout" onClick={() => {
                localStorage.removeItem("key")
                navigate("/login")
            }}>
                Logout &nbsp; <img className="logout-icon" src={logoutIcon} alt="logout"/>
            </div>
            <img className='changeButton' src={addTaskIcon} alt="Next Page" onClick={() => navigate('/add', { replace: true })}/>
        </div>
    )
}

const TaskElement = (props) => {

    const handleDelete = () => {
        props.deleteTask(props.id)
        console.log(props.fid)
        remove(ref(db, "tasks/"+localStorage.getItem('key')+"/todos/" + props.fid))
    }

    return(
        <tr>
            <td>{ props.id+1 }</td>
            <td>{ props.value }</td>
            <td><img className="image-icon" src={ delIcon } alt="delete" onClick={handleDelete}/></td>
        </tr>
    )
}

export default ViewTask