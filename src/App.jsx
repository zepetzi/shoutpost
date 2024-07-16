import { useState } from 'react'
import { v4 as uuid }  from 'uuid' ;
import './App.css';
import './index.css';
import SignIn from './components/auth/LogInForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <h1>
        Shoutpost
        </h1>

      
      {/* <div className="card">

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      
      </div> */}
      
    </>
  )
}

export default App


