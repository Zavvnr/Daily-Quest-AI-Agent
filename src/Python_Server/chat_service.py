# services/chat_service.py
from openai import OpenAI
import os

class ChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def call_ai_api(self, model_id, prompt_text):
        """
        Pure execution. No business logic here.
        """
        try:
            response = self.client.chat.completions.create(
                model=model_id,
                messages=[{"role": "user", "content": prompt_text}]
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"API Error: {e}")
            return None