import random
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Mock Database for Daily Draws
# In production, this would be a DB table: UserDailyDraws(user_id, date, result_id)
DAILY_DRAWS_DB = {} 

# 64 Hexagrams or Traditional Lots (Simplified for MVP)
LOTS = [
    {"id": 1, "title": "The Creative", "meaning": "Great success. Perseverance furthers.", "lucky_direction": "North"},
    {"id": 2, "title": "The Receptive", "meaning": "Supreme success. If the gentleman undertakes something and tries to lead, he goes astray.", "lucky_direction": "South-West"},
    {"id": 3, "title": "Difficulty at the Beginning", "meaning": "It furthers one to appoint helpers.", "lucky_direction": "East"},
    {"id": 4, "title": "Youthful Folly", "meaning": "It is not I who seek the young fool; the young fool seeks me.", "lucky_direction": "North"},
    {"id": 5, "title": "Waiting", "meaning": "If you are sincere, you have light and success.", "lucky_direction": "West"},
    # ... Add more as needed
    {"id": 99, "title": "Great Fortune", "meaning": "The stars align in your favor today.", "lucky_direction": "Center"}
]

class DailyDrawResponse(BaseModel):
    date: str
    lot_id: int
    title: str
    meaning: str
    lucky_direction: str
    already_drawn: bool

@router.get("/draw", response_model=DailyDrawResponse)
def draw_daily_lot():
    # For MVP, we use a simple random draw.
    # In a real app with Auth, we would check:
    # user_id = current_user.id
    # today = datetime.now().date()
    # if (user_id, today) in DAILY_DRAWS_DB: return cached_result
    
    # Mocking "Already Drawn" logic with a random chance or session based if we had it.
    # Here we just return a random lot every time for demo purposes, 
    # but flag 'already_drawn' as false to allow animation.
    
    lot = random.choice(LOTS)
    
    return DailyDrawResponse(
        date=datetime.now().strftime("%Y-%m-%d"),
        lot_id=lot["id"],
        title=lot["title"],
        meaning=lot["meaning"],
        lucky_direction=lot["lucky_direction"],
        already_drawn=False
    )
