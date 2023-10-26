import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1 style={{color:"brown"}}>Clicked {count} Times</h1>
        <button onClick={() => setCount((count) => count + 1)} style={{backgroundColor:"black",color:"white"}}>
          Clicked
        </button>
    </>
  )
}

export default App
