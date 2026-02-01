from Python_Server.chat_service import ChatService

class ChatManager:
    def __init__(self):
        self.service = ChatService()

    def process_quest_request(self, course_name, notes):
        # 1. BRAIN: Decide which model to use
        # Logic: Use o1-mini for math, gpt-4o-mini for others
        if "Optimization" in course_name or "Math" in course_name:
            selected_model = "o3-mini"
        else:
            selected_model = "gpt-4o-mini"

        # 2. BRAIN: Construct the specific prompt
        system_instruction = "You are a gamified tutor. Output JSON only."
        full_prompt = f"{system_instruction}\n\nContext: {course_name}\nNotes: {notes}"

        # 3. DELEGATE: Ask the Service to do the heavy lifting
        raw_response = self.service.call_ai_api(selected_model, full_prompt)

        # 4. BRAIN: Clean up the response (Validation)
        # (e.g., ensure it's valid JSON before sending back)
        return raw_response