import { useEffect, useState } from 'react'
import { onValue, ref, remove } from 'firebase/database'

import '../assets/css/viewTask.css'
import addTaskIcon from '../assets/images/button.png'
import delIcon from '../assets/images/trash.png'

import db from '../firebase'

const ViewTask = (props) => {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        const query = ref(db, "tasks")
        onValue(query, (snapshot) => {
            let tasks = []
            snapshot.forEach(element => {
                tasks.push({ id: element.key, value: element.val() })
            })
            setTodoList(tasks)
        })

    }, [])

    const handlePageChange = () => {
        props.changePage(1)
    }

    const handleDelete = (id) => {
        const newList = todoList.filter((el, i) => i !== id)
        setTodoList(newList)
    }

    return (
        <div className='container'>
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

            <img className='changeButton' src={addTaskIcon} alt="Next Page" onClick={handlePageChange}/>
        </div>
    )
}

const TaskElement = (props) => {

    const handleDelete = () => {
        props.deleteTask(props.id)
        remove(ref(db, "tasks/" + props.fid))
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