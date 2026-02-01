# Daily Quest AI Agent - Copilot Instructions

## Project Overview

**Daily Quest** is a full-stack gamified learning platform that generates personalized daily review questions for students. It combines React frontend, Node.js/Express backend, MongoDB persistence, and Python FastAPI AI orchestration.

### Core Purpose
Transform student notes from daily lectures into engaging "quests" (review questions) using AI, with adaptive difficulty and hint systems.

## Architecture & Data Flow

### Three-Layer Architecture

1. **Frontend (React + Vite)**
   - File: [src/App.jsx](src/App.jsx)
   - Handles course selection, user note input, and quest display
   - Uses Axios to POST requests to Node backend at `http://localhost:5000`
   - State management with `useState`, `useEffect` for course context

2. **Node.js Bridge Layer (Express + MongoDB)**
   - File: [src/Server.js](src/Server.js)
   - **Does NOT call AI directly** — acts as middleware
   - Routes quest generation requests to Python backend at `http://localhost:5000` (separate from Node server)
   - Manages MongoDB course schema: `{name, description, prompts[], answers[]}`
   - Provides API endpoints for course data retrieval and history storage

3. **Python AI Engine (FastAPI + OpenAI)**
   - Files: [src/main.py](src/main.py), [src/Python_Server/](src/Python_Server/)
   - **Separates concerns using Manager/Service pattern:**
     - `ChatManager`: Business logic (model selection, prompt construction, validation)
     - `ChatService`: Pure API execution (calls OpenAI)
     - `ChatController`: Route handler
   - **Model selection logic in ChatManager:**
     - Optimization/Math courses → `o3-mini`
     - Other courses → `gpt-4o-mini`
   - Runs on port 8000, Node backend proxies to it

### Request Flow
```
React (port 5173) 
  → Axios POST /api/generate-quest 
    → Express Server.js (port 5000)
      → FastAPI main.py (port 8000)
        → ChatManager processes → ChatService calls OpenAI
```

## Developer Workflows

### Start Development
```bash
npm run dev  # Starts Vite dev server (port 5173)
```

### Running Full Stack Locally
You need **three separate terminal sessions**:

1. **Node Backend** (from repo root):
   ```bash
   node src/Server.js  # Port 5000, requires MongoDB running
   ```

2. **Python AI Backend** (from repo root):
   ```bash
   python src/main.py  # Port 8000, requires OPENAI_API_KEY env var
   ```

3. **React Frontend** (from repo root):
   ```bash
   npm run dev  # Port 5173 (Vite)
   ```

### Required Services
- **MongoDB**: Must be running locally (`mongodb://127.0.0.1:27017/myDB`)
- **OpenAI API Key**: Set `OPENAI_API_KEY` environment variable in your shell

### Build & Lint
```bash
npm run build    # Vite production build
npm run lint     # ESLint check (eslint.config.js)
npm run preview  # Serve built assets locally
```

## Key Project Patterns

### 1. Configuration
- [config.json](config.json): OpenAI API key, location, timezone
- [system_prompt.txt](system_prompt.txt): AI system instructions for quest generation
  - Returns structured JSON: `{title, challenge, hint, difficulty}`
  - Enforces hint limit (5 hints before showing answer)

### 2. Course Data Model (MongoDB)
```javascript
// Stored in 'Course' collection
{
  name: String,           // e.g., "Linear Optimization"
  description: String,
  prompts: [String],      // User notes history
  answers: [String]       // Generated quests history
}
```

### 3. Quest JSON Structure (API Output)
```json
{
  "title": "Simplex Stumper",
  "challenge": "Explain the simplex method...",
  "hint": "Think about how constraints shape...",
  "difficulty": 7
}
```

### 4. Error Handling Pattern
- Frontend catches axios errors, alerts user with "Is the backend running?"
- Python service logs API errors but returns None gracefully
- Node middleware validates requests before forwarding

## File Organization

- `src/App.jsx` — Main React component, handles form & API calls
- `src/Server.js` — Express server, MongoDB connection, course endpoints
- `src/main.py` — FastAPI app entry point
- `src/Python_Server/chat_*.py` — Manager/Service/Controller separation
- `config.json` — Runtime configuration
- `system_prompt.txt` — AI tutor system instructions
- `package.json` — Node dependencies (express, mongoose, axios, python-shell)

## Common Tasks

### Adding a New Course
1. Edit [src/App.jsx](src/App.jsx) button list (lines ~70-80)
2. Add to [src/Server.js](src/Server.js) `initialCourses` array (lines ~25-32)
3. Restart Node backend

### Changing AI Model Selection Logic
- Edit [src/Python_Server/chat_manager.py](src/Python_Server/chat_manager.py) lines 12-17
- Update course name patterns in the condition check

### Modifying Quest Response Format
- Update `system_prompt.txt` with new JSON field requirements
- Update `ChatManager.process_quest_request()` validation logic
- Ensure React [src/App.jsx](src/App.jsx) expects matching structure

## Important Notes

- **Port Conflicts**: Frontend (5173), Node (5000), Python (8000) must not overlap
- **CORS Enabled**: Express has `cors()` middleware; Python should add if cross-origin calls expand
- **Database Reset**: Delete MongoDB `myDB` collection to trigger re-initialization on next Node start
- **Python Shell Integration**: `python-shell` is in package.json but not currently used; consider for async integration
- **No TypeScript**: Project uses plain JavaScript/JSX; ESLint configured for React patterns
