from fastapi import APIRouter
from Python_Server.chat_manager import ChatManager

router = APIRouter()
manager = ChatManager()

@router.post("/generate")
async def generate_quest(data: dict):
    # Just pass the data to the boss (Manager)
    return manager.process_quest_request(data['course'], data['notes'])