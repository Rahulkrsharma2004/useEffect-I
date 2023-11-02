import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TodoList from './TodoList'
import AddTask from './AddTask'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const responce = await axios.get(`http://localhost:5000/tasks?_limit=3&_page=${page}`)
      // const responce = await axios.get(`http://localhost:5000/tasks?${page}`)
      setTasks(responce.data)
      console.log(responce.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [page])



  return (
    <>
      <div>
         {error && <div>Error :{error} </div>}
         {loading ? (<div>Loading......</div>):(<TodoList tasks={tasks} fetchTasks={fetchTasks}/>)}
         {<AddTask fetchTasks={fetchTasks}/>}
      </div>
      
    </>
  )
}

export default App
