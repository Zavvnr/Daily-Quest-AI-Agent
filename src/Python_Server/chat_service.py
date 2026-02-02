from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class ChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.prompt_path = os.path.join(current_dir, "../system_prompt.txt")

    def _get_system_prompt(self, course_name):
        """Reads the text file and fills in the blanks"""
        try:
            with open(self.prompt_path, "r", encoding="utf-8") as f:
                content = f.read()
                filled_content = content.replace("{course_name}", course_name)
                filled_content = filled_content.replace("{course_description}", "General academic topic")
                return filled_content
            
        except FileNotFoundError:
            print("⚠️ Error: system_prompt.txt not found!")
            return "You are a helpful academic tutor."
        
    def generate_response(self, course_name, notes, model_id="gpt-4o-mini"):
        """Calls the OpenAI API with the given model and prompt"""
        system_instruction = self._get_system_prompt(course_name)

        try:
            response = self.client.chat.completions.create(
                model=model_id,
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": f"Here are my notes: {notes}"}
                ],
                response_format={ "type": "json_object" },
                temperature=0.7
            )
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI API Error: {e}")
            return None