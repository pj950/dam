import os
from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mystic Insights"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "development_secret_key")
    
    # AI Keys (Comma separated)
    OPENAI_API_KEYS: List[str] = os.getenv("OPENAI_API_KEYS", "").split(",")
    GEMINI_API_KEYS: List[str] = os.getenv("GEMINI_API_KEYS", "").split(",")
    
    # Stripe
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
    
    class Config:
        case_sensitive = True

settings = Settings()
