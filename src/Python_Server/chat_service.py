import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import PromptTemplate
from openai import OpenAI

load_dotenv()

class ChatService:
    
    def _load_template(self):
        """Load the system prompt template without substitution"""
        try:
            with open(self.prompt_path, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            print("⚠️ Error: system_prompt.txt not found!")
            return "You are a helpful academic tutor for the course: {course_name}."
    
    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=os.getenv("OPENAI_API_KEY"),
            model="gpt-4o-mini",
            temperature=0.3,
            max_tokens=500,
            top_p=1.0,
            frequency_penalty=0.5,
            presence_penalty=0.5            
        )
        
        # LangChain handles the history automatically!
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", 
            input_key="notes"
        )
        
        # Load the system prompt template and create the PromptTemplate object
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.prompt_path = os.path.join(current_dir, "../system_prompt.txt")
        self.raw_template = self._load_template()
        
        # Create chain with the template (variables will be filled on generate_response)
        self.prompt = PromptTemplate(
            input_variables=["chat_history", "notes", "course_name", "course_description"],
            template=self.raw_template
        )
        
        # The Chain connects the LLM, the Prompt, and the Memory
        self.chain = LLMChain(
            llm=self.llm,
            prompt=self.prompt,
            memory=self.memory
        )
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.prompt_path = os.path.join(current_dir, "../system_prompt.txt")

    def generate_response(self, course_name, notes, model_id=None):
        return self.chain.run(
            course_name=course_name, 
            notes=notes,
            course_description="General academic topic"
        )

    def _get_system_prompt(self, course_name):
        try:
            with open(self.prompt_path, "r", encoding="utf-8") as f:
                content = f.read()
                filled_content = content.replace("{course_name}", course_name)
                # filled_content = filled_content.replace("{course_description}", "General academic topic")
                return filled_content
            
        except FileNotFoundError:
            print("⚠️ Error: system_prompt.txt not found!")
            return "You are a helpful academic tutor."