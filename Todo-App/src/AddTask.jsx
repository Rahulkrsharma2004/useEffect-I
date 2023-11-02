import { useState } from "react";
import axios from 'axios'

export default function AddTask({ fetchTasks }) {

    const [task, setTask] = useState("")

    const AddTask = async () => {
        try {
          await axios.post(`http://localhost:5000/tasks`,{
            title:task,
            completed:false,
          })
          fetchTasks()
          setTask("")
        } catch (error) {
           console.log(error)
        }
    }

    return (
        <div>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={AddTask}>Add</button>
        </div>
    )
}