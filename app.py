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
llm = openai_client.chat.completions.create(
    model="o3-mini",
    temperature=0.7,
)

print("Chatbot is ready!")

while True:
    # get input from the user
    user_prompt = input("You: ")
    
    # send the prompt to the model and get a response
    response = llm.invoke(user_prompt)
    
    # answer from the model
    reply = response.choices[0].message['content']