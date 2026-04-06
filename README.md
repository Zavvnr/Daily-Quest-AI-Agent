# Daily Quest AI Agent

Daily Quest is a full-stack review system that generates "quests" (review questions). It is made as a hobby project and uses React frontend, Node.js/Express backend, MongoDB persistence, and a Python FastAPI AI orchestration layer. It uses langchain

## Key Features

- Generate review questions from student notes
- Adaptive difficulty and hint support
- Three-layer architecture:
    - React frontend
    - Node.js API middleware
    - Python AI service

## Architecture

1. **Frontend**  
     - `src/App.jsx`
     - React + Vite
     - Sends user notes and course selection to Node backend

2. **Node.js Bridge Layer**  
     - `src/Server.js`
     - Express + MongoDB
     - Validates requests
     - Proxies quest generation to Python backend
     - Stores course and history data

3. **Python AI Engine**  
     - `src/main.py`
     - FastAPI
     - Uses `ChatManager`, `ChatService`, `ChatController`
     - Calls OpenAI to generate structured quest JSON

## Local Setup

### Prerequisites

- Node.js
- Python
- MongoDB running locally
- `OPENAI_API_KEY` environment variable set

### Install

From the repo root:

```bash
npm install
```

## Run Locally

Run three terminals:

1. Node backend:
     ```bash
     node src/Server.js
     ```

2. Python AI backend:
     ```bash
     python src/main.py
     ```

3. React frontend:
     ```bash
     npm run dev
     ```

## API Flow

React front-end → Node Express (`http://localhost:5000`) → Python FastAPI (`http://localhost:8000`) → OpenAI

## Data Model

MongoDB course document:
```json
{
    "name": "Linear Optimization",
    "description": "string",
    "prompts": ["note text"],
    "answers": ["generated quest JSON"]
}
```

## Quest Output

The AI returns structured JSON like:

```json
{
    "title": "Simplex Stumper",
    "challenge": "Explain the simplex method...",
    "hint": "Think about how constraints shape...",
    "difficulty": 7
}
```

## Common Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint check
- `npm run preview` — serve built assets

## Notes

- Node server runs on port `5000`
- Python service runs on port `8000`
- React dev server runs on port `5173`
- `system_prompt.txt` controls AI output format
- Course list is initialized in `src/Server.js`
- Model selection logic is in `src/Python_Server/chat_manager.py`
- To reset data, clear the MongoDB `myDB` collection
