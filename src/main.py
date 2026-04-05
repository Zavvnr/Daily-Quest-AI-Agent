# main.py
from fastapi import FastAPI
import uvicorn
from src.Python_Server.chat_controller import router as chat_router
import os
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from a .env file
load_dotenv(find_dotenv())

if not os.getenv("OPENAI_API_KEY"):
    print("❌ Error: OPENAI_API_KEY not found. Did you create the .env file?")
else:
    print("✅ OpenAI API Key loaded successfully.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connects Controller to the main app
app.include_router(chat_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Python Server is Running"}

if __name__ == "__main__":
    # Runs the server on Port 8000
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    uvicorn.run("main:app", host=host, port=port, reload=reload)