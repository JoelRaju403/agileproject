#This file is to test whether openai is configured properly


import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that translates English to French.",
        },
        {
            "role": "user",
            "content": 'Translate the following English text to French: "Hello, how are you?"',
        }
    ],
    model="gpt-3.5-turbo",
)

print(chat_completion.choices[0].message.content)
