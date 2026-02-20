# ai/llm_client.py

import requests
from config import LLM_API_KEY


def call_llm(prompt: str) -> str:
    """
    Sends prompt to Gemini API and returns generated text.

    Returns:
        Model response text OR error message.
    """

    if not LLM_API_KEY:
        return "Error: LLM API key not configured."

    url = (
        "https://generativelanguage.googleapis.com/"
        "v1beta/models/gemini-pro:generateContent"
        f"?key={LLM_API_KEY}"
    )

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            data = response.json()

            # Safely extract generated text
            try:
                return data["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError):
                return "LLM returned unexpected response structure."

        else:
            return f"LLM Error {response.status_code}: {response.text}"

    except requests.exceptions.RequestException as e:
        return f"Connection Error: {str(e)}"