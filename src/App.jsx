import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import nodeJsLogo from '/nodedotjs.svg'
import expressJsLogo from '/express.svg'
import flaskLogo from '/flask.svg'
import mongodbLogo from '/mongodb.svg'
import langchainLogo from '/langchain.svg'
// import pythonLogo from '/python.svg'
import './App.css'

function App() {
  const [course, setCourse] = useState('Linear Optimization'); // default course
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (course) {
      console.log(`Fetching items for: ${course}`);
      axios.get('/api/items').then(response => { setItems(response.data); });
    }
  }, [course]);

  const handleAddPrompt = async (e) => {
    // stop the page from reloading
    e.preventDefault();

    // get the text from the input field named "question"
    const questionText = e.target.question.value;

    if (!course) {
      alert("Please select a course first!");
      return;
    }

    try {
      // send the PATCH request to add the prompt to the DB
      await axios.patch('http://localhost:5000/api/courses/prompts', {
        name: course,
        prompt: questionText
      });

      alert('Question saved to database!');
      
      // clear input field
      // e.target.reset();

    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Failed to save prompt.");
    }
  };

  // JSX to render the component to the DOM to create the UI
  return (
    <>
      <p className="title">
        Welcome to Daily Quest AI Agent!
      </p>
      <h2>Let's Start by Choosing a Course</h2>
      <div>
        <button className="courses" onClick={() => setCourse('Linear Optimization')}>Linear Optimization  </button>
        <button className="courses" onClick={() => setCourse('Graphs and Networks in Data Science')}>Graphs and Networks in Data Science  </button>
        <button className="courses" onClick={() => setCourse('Securing Information Networks')}>Securing Information Networks  </button>
      </div>
      <div>
        <button className="courses" onClick={() => setCourse('Responsibility in the Age of Big Data and AI')}>Responsibility in the Age of Big Data and AI  </button>
        <button className="courses" onClick={() => setCourse('Statistical Data Visualization')}>Statistical Data Visualization  </button>
        <button className="courses" onClick={() => setCourse('Interaction Design Studio')}>Interaction Design Studio  </button>
      </div>
      <div>
        <h2>Your Selected Course is: {course}</h2>
      </div>

      <div className="quest-form-container" style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Ask a question about {course}</h3>
          <form onSubmit={handleAddPrompt} style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginLeft: '75px' }}>Enter your question: </p>
            <input type="text" name="question" placeholder="Your question" style={{ padding: '8px', width: '60%', marginRight: '10px', marginLeft: '10px' }}/>
            <input type="submit" value="Submit" style={{ padding: '8px 16px', cursor: 'pointer' }}/>
          </form>
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
        <a href="https://nodejs.org" target="_blank">
          <img src={nodeJsLogo} className="logo nodejs" alt="Node.js logo" />
        </a>
        <a href="https://expressjs.com" target="_blank">
          <img src={expressJsLogo} className="logo expressjs" alt="Express.js logo" />
        </a>
        <a href="https://flask.palletsprojects.com" target="_blank">
          <img src={flaskLogo} className="logo flask" alt="Flask logo" />
        </a>
        <a href="https://www.mongodb.com" target="_blank">
          <img src={mongodbLogo} className="logo mongodb" alt="MongoDB logo" />
        </a>
        <a href="https://langchain.com" target="_blank">
          <img src={langchainLogo} className="logo langchain" alt="Langchain logo" />
        </a>
      </div>
    </>
  )
}

export default App
