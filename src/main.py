# main.py
from fastapi import FastAPI
import uvicorn
from Python_Server.chat_controller import router as chat_router

app = FastAPI()

# This connects your Controller to the main app
# Now your routes will look like: POST /api/generate
app.include_router(chat_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Python Server is Running"}

if __name__ == "__main__":
    # Runs the server on Port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)