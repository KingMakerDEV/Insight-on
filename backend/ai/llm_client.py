# ai/llm_client.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

_cached_model_name = None


def call_llm(prompt: str) -> str:
    try:
        if LLM_PROVIDER == "gemini":
            return _call_gemini(prompt)

        return _mock_response(prompt)

    except Exception as e:
        return f"LLM Internal Error: {str(e)}"


# -------------------------------------------------------
# DYNAMIC MODEL DISCOVERY
# -------------------------------------------------------

def _get_available_gemini_model():
    global _cached_model_name

    if _cached_model_name:
        return _cached_model_name

    if not GEMINI_API_KEY:
        return None

    url = f"https://generativelanguage.googleapis.com/v1/models?key={GEMINI_API_KEY}"

    response = requests.get(url, timeout=15)

    if response.status_code != 200:
        return None

    data = response.json()

    for model in data.get("models", []):
        # Only choose models supporting generateContent
        if "generateContent" in model.get("supportedGenerationMethods", []):
            _cached_model_name = model["name"]
            return _cached_model_name

    return None


# -------------------------------------------------------
# GEMINI CALL (DYNAMIC MODEL)
# -------------------------------------------------------

def _call_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY:
        return "Gemini API key not configured."

    model_name = _get_available_gemini_model()

    if not model_name:
        return "No compatible Gemini model found for this API key."

    url = f"https://generativelanguage.googleapis.com/v1/{model_name}:generateContent?key={GEMINI_API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers, timeout=30)

    if response.status_code != 200:
        return f"Gemini API Error: {response.text}"

    data = response.json()

    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return "Gemini returned unexpected response format."


# -------------------------------------------------------
# MOCK FALLBACK
# -------------------------------------------------------

def _mock_response(prompt: str) -> str:
    return (
        "Executive Insight (Mock Mode): "
        "The dataset exhibits structured patterns across key variables. "
        "Trend and correlation analysis indicate meaningful relationships. "
        "Strategic policy evaluation is recommended."
    )