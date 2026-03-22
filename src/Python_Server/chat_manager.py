from Python_Server.chat_service import ChatService

class ChatManager:
    def __init__(self):
        self.service = ChatService()

    def process_quest_request(self, course_name, notes):
        if "Optimization" in course_name or "Math" in course_name or "Data Science" in course_name:
            selected_model = "gpt-4o"
            print(f"🧠 Manager: Detected complex topic '{course_name}'")
        else:
            selected_model = "gpt-4o-mini"
            print(f"⚡ Manager: Detected standard topic '{course_name}'")

        return self.service.generate_response(course_name, notes)