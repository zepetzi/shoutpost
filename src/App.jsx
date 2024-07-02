import { useState } from 'react'
import { v4 as uuid }  from 'uuid' ;
import './App.css';
import SignIn from './components/auth/SignIn';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>
        Shoutpost
        </h1>
      </div>

      <div>
        <SignIn></SignIn>
      </div>
      
      <div className="card">

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      
      </div>
      
    </>
  )
}

export default App


