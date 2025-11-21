from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from backend.ai_engine.client import ai_client
from backend.ai_engine.prompts import get_prompt
from backend.api.deps import get_current_user

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/send")
async def chat_with_master(req: ChatRequest, current_user: dict = Depends(get_current_user)):
    # Check VIP status
    # In a real app, we check current_user['subscription_tier'] or similar from DB
    # For MVP, we assume all authenticated users can try, or mock the check.
    
    # user_tier = current_user.get("app_metadata", {}).get("tier", "free")
    # if user_tier != "vip":
    #     raise HTTPException(status_code=403, detail="VIP Access Required")
    
    system_prompt = get_prompt("vip")
    
    # Construct full context
    # Ideally we inject the user's chart here too if available
    
    # For MVP, just send the last message or full history to OpenAI
    last_message = req.messages[-1].content
    
    response = ai_client.generate_report(system_prompt, last_message)
    
    return {"response": response}
