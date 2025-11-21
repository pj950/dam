import random
import os
from openai import OpenAI
# import google.generativeai as genai # Uncomment if using official SDK, but we'll use OpenAI compatible endpoint or mock for now to avoid dependency issues if not installed
from backend.core.config import settings

class AIClient:
    def __init__(self):
        self.openai_keys = [k for k in settings.OPENAI_API_KEYS if k]
        self.gemini_keys = [k for k in settings.GEMINI_API_KEYS if k]
        
    def get_openai_client(self) -> OpenAI:
        key = random.choice(self.openai_keys) if self.openai_keys else "mock-key"
        return OpenAI(api_key=key)

    def generate_report(self, system_prompt: str, user_data: str) -> str:
        # Priority 1: Gemini (via Google GenAI SDK or OpenAI Compat)
        # For this implementation, we will try to use Gemini first if keys exist.
        # Since we might not have google-generativeai installed, we'll simulate the structure 
        # or use OpenAI client with Gemini base_url if applicable (Gemini offers OpenAI compat).
        
        # STRATEGY:
        # 1. Try Gemini (Mocked or Real if configured)
        # 2. Try GPT-4o
        # 3. Try GPT-4-turbo
        # 4. Try GPT-3.5-turbo
        
        # 1. Attempt Gemini
        if self.gemini_keys:
            try:
                # Placeholder for actual Gemini call
                # genai.configure(api_key=random.choice(self.gemini_keys))
                # model = genai.GenerativeModel('gemini-pro')
                # response = model.generate_content(f"{system_prompt}\n\n{user_data}")
                # return response.text
                pass 
            except Exception as e:
                print(f"Gemini Failed: {e}")

        # 2-4. Attempt OpenAI Models
        client = self.get_openai_client()
        models = ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"]
        
        for model in models:
            try:
                print(f"Trying model: {model}")
                response = client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_data}
                    ],
                    temperature=0.7
                )
                return response.choices[0].message.content
            except Exception as e:
                print(f"Model {model} failed: {e}")
                continue
                
        return "The mists of destiny are thick today. All oracles are silent. Please try again later."

ai_client = AIClient()
