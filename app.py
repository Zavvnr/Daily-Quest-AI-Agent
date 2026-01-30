import json
import os
import sys

from datetime import datetime, timedelta
from openai import OpenAI

# Load the API key from the json file
with open('config.json', 'r') as file:
    config = json.load(file)

# configuration
OPENAI_API_KEY = config['OPENAI_API_KEY']
LOCATION = config['LOCATION']
TIMEZONE = config['TIMEZONE']

# Initialize the OpenAI client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

print("Chatbot is ready!")

def load_system_prompt(file_path: str) -> str:
    """Load the system prompt from file."""
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except Exception as e:
        print(f"Error loading system prompt: {e}")
        return "You are a helpful assistant."

def generate_quest(user_notes, course_name, course_description):
    """
    Takes user notes and generates a gamified quest/question.
    """
    
    # system prompt
    system_prompt = load_system_prompt('system_prompt.txt')
    try:
        response = openai_client.chat.completions.create(
            model="o3-mini", # Best Reasoning Mini model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Here are my notes: {user_notes}"}
            ],
            response_format={"type": "json_object"}, # Ensure the response is a JSON object
            max_tokens=500,
            temperature=0.3,
            frequency_penalty=0.2,
            presence_penalty=0.0,
        )
        
        return response.choices[0].message.content

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    if len(sys.argv) > 2:
        course = sys.argv[1]
        notes = sys.argv[2]
        print(generate_quest(notes, course))
    else:
        print(json.dumps({"error": "Not enough arguments provided"}))