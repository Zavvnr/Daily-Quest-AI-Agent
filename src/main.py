# main.py
from fastapi import FastAPI
import uvicorn
from Python_Server.chat_controller import router as chat_router
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

if not os.getenv("OPENAI_API_KEY"):
    print("❌ Error: OPENAI_API_KEY not found. Did you create the .env file?")
else:
    print("✅ OpenAI API Key loaded successfully.")

app = FastAPI()

# Connects Controller to the main app
app.include_router(chat_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Python Server is Running"}

if __name__ == "__main__":
    # Runs the server on Port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)