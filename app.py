import os

from datetime import datetime, timedelta
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


# Load the API key from the .env variable
load_dotenv()

# configuration
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
CANVAS_URL = os.getenv("CANVAS_API_URL")
CANVAS_TOKEN = os.getenv("CANVAS_API_TOKEN")
LOCATION = "Madison, Wisconsin"
TIMEZONE = "America/Chicago"

# 2. Initialize the Gemini model
# LangChain automatically looks for the GOOGLE_API_KEY in your environment
llm = ChatGoogleGenerativeAI(model="gemini-pro")

print("Chatbot is ready. Ask me anything! (Type 'exit' to quit)")

# 3. Create a simple loop to chat
while True:
    # Get input from the user
    user_prompt = input("You: ")
    
    if user_prompt.lower() == 'exit':
        break
    
    # Send the prompt to the model and get a response
    response = llm.invoke(user_prompt)
    
    # Print the model's answer
    print(f"Gemini: {response.content}")