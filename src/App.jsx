import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="title">
        Welcome to Daily Quest AI Agent!
      </p>
      <h2>Let's Start by Choosing a Course</h2>
      <div>
        <a>Linear Optimization  </a>
        <a>Graphs and Networks in Data Science  </a>
        <a>Securing Information Networks  </a>
      </div>
      <div>
        <a>Responsibility in the Age of Big Data and AI  </a>
        <a>Statistical Data Visualization  </a>
        <a>Interaction Design Studio  </a>
      </div>
      <div>
                <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
