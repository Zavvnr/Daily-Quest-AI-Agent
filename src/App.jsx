import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import nodeJsLogo from '/nodedotjs.svg'
import expressJsLogo from '/express.svg'
import mcpLogo from '/mcp.svg'
import mongodbLogo from '/mongodb.svg'
import langchainLogo from '/langchain.svg'
import pythonLogo from '/python.svg'
import fastapiLogo from '/fastapi.svg'
import openaiLogo from '/openai.svg'
import './App.css'

function App() {
  const [course, setCourse] = useState('Linear Optimization'); // default course
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questData, setQuestData] = useState(null);

  useEffect(() => {
    if (course) {
      console.log(`Fetching items for: ${course}`);
      axios.get('/api/items').then(response => { setItems(response.data); });
    }
  }, [course]);

  const handleGenerateQuest = async (e) => {
    e.preventDefault();
    const userNotes = e.target.question.value;

    if (!course) {
      alert("Please select a course first!");
      return;
    }

    setLoading(true);
    setQuestData(null); // Clear previous result

    try {
      // Node.js bridge to call Python backend
      // Node.js makes a POST request to the Python FastAPI server
      const response = await axios.post('http://localhost:5000/api/generate-quest', {
        courseName: course,
        userNotes: userNotes
      });

      // Python returns a JSON string, so we might need to parse it if it's double-stringified
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

      setQuestData(data); // Save the quest to state

    } catch (error) {
      console.error("Error generating quest:", error);
      alert("Failed to generate quest. Is the backend running?");
    } finally {
      setLoading(false);
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

      <div className="quest-form-container" style={{ margin: '20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', maxWidth: '600px' }}>
        <h3>Generate a Quest</h3>
        <p>What did you learn in class today?</p>

        <form onSubmit={handleGenerateQuest} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="text"
            name="question"
            placeholder="e.g., We discussed Simplex Method..."
            style={{ padding: '10px', width: '70%', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" disabled={loading} style={{ cursor: 'pointer' }}>
            {loading ? "Thinking..." : "Generate"}
          </button>
        </form>
      </div>

      {questData && (
        <div className="quest-card" style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#1a1a1a',
          border: '2px solid #646cff',
          borderRadius: '10px',
          textAlign: 'left',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2 style={{ marginTop: 0 }}>⚔️ {questData.quest_title || "New Quest"}</h2>
          <p><strong>Challenge:</strong> {questData.challenge}</p>

          <details style={{ marginTop: '15px', cursor: 'pointer' }}>
            <summary>Need a Hint?</summary>
            <p style={{ color: '#aaa', marginTop: '5px' }}>{questData.hint}</p>
          </details>

          <div style={{ marginTop: '15px', textAlign: 'right', color: '#ffd700', fontWeight: 'bold' }}>
            Reward: +{questData.xp_reward || 10} XP
          </div>
        </div>
      )}

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
        <a href="https://www.mongodb.com" target="_blank">
          <img src={mongodbLogo} className="logo mongodb" alt="MongoDB logo" />
        </a>
        <a href="https://langchain.com" target="_blank">
          <img src={langchainLogo} className="logo langchain" alt="Langchain logo" />
        </a>
        <a href="https://www.mcp.ai" target="_blank">
          <img src={mcpLogo} className="logo mcp" alt="MCP logo" />
        </a>
        <a href="https://platform.openai.com" target="_blank">
          <img src={openaiLogo} className="logo openai" alt="OpenAI logo" />
        </a>
        <a href="https://www.python.org" target="_blank">
          <img src={pythonLogo} className="logo python" alt="Python logo" />
        </a>
        <a href="https://fastapi.tiangolo.com" target="_blank">
          <img src={fastapiLogo} className="logo fastapi" alt="FastAPI logo" />
        </a>
      </div>
    </>
  )
}

export default App
