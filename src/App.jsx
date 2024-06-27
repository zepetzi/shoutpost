import { useState } from 'react'
import './App.css'
import './CanvasPage'
import CanvasPage from './CanvasPage'
import { v4 as uuid }  from 'uuid' ;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>
        Test
        </h1>
        <h2>
        Test
        </h2>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      
      </div>
      <CanvasPage></CanvasPage>
    </>
  )
}

export default App
