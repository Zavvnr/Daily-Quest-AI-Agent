import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import nodejsLogo from './assets/nodejs.svg'
import './App.css'

function App() {
  const [course, setCourse] = useState('');

  return (
    <>
      <p className="title">
        Welcome to Daily Quest AI Agent!
      </p>
      <h2>Let's Start by Choosing a Course</h2>
      <div>
        <button class="courses" onClick={() => setCourse('Linear Optimization')}>Linear Optimization  </button>
        <button class="courses" onClick={() => setCourse('Graphs and Networks in Data Science')}>Graphs and Networks in Data Science  </button>
        <button class="courses" onClick={() => setCourse('Securing Information Networks')}>Securing Information Networks  </button>
      </div>
      <div>
        <button class="courses" onClick={() => setCourse('Responsibility in the Age of Big Data and AI')}>Responsibility in the Age of Big Data and AI  </button>
        <button class="courses" onClick={() => setCourse('Statistical Data Visualization')}>Statistical Data Visualization  </button>
        <button class="courses" onClick={() => setCourse('Interaction Design Studio')}>Interaction Design Studio  </button>
      </div>
      <div>
        <h2>Your Selected Course is: {course}</h2>
      </div>
      <div>
        <h2>About</h2>
        <p>This is a daily quest AI agent designed for us to learn and create materials based on courses we are taking each semester.
          It helps students engage with course content through interactive AI-driven activities. The agent generates daily quests, 
          quizzes, and study guides tailored to the selected course, using an LLM to provide personalized learning experiences. Frameworks and tools used 
          include Langchain, MCP, Vite, React, Express.js, and OpenAI's GPT-4 API. The sourcecode is available on
          <a href="https://github.com/Zavvnr/Daily-Quest-AI-Agent"> https://github.com/Zavvnr/Daily-Quest-AI-Agent</a>
        </p>
      </div>
      <div>
        <h1>
          Made Possible by:
        </h1>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://reac.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
