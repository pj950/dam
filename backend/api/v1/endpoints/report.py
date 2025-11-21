from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.ai_engine.client import ai_client
from backend.ai_engine.prompts import get_prompt
from backend.bazi_engine import calculate_bazi
from backend.schemas import ChartRequest

router = APIRouter()

class ReportRequest(BaseModel):
    chart_data: ChartRequest
    tier: str = "free" # free, pro, vip

@router.post("/generate")
async def generate_report(req: ReportRequest):
    # 1. Calculate Chart Data first (or use cached)
    # Here we re-calculate to ensure freshness and security
    try:
        chart = calculate_bazi(req.chart_data)
        
        # 2. Prepare Context for AI
        context = f"""
        User Name: {chart.name}
        Gender: {chart.gender}
        Day Master: {chart.day_master}
        Day Master Strength: {chart.day_master_strength}
        
        Four Pillars:
        Year: {chart.year_pillar.gan}{chart.year_pillar.zhi}
        Month: {chart.month_pillar.gan}{chart.month_pillar.zhi}
        Day: {chart.day_pillar.gan}{chart.day_pillar.zhi}
        Hour: {chart.hour_pillar.gan}{chart.hour_pillar.zhi}
        
        Special Patterns: {', '.join(chart.special_patterns)}
        """
        
        # 3. Get System Prompt
        system_prompt = get_prompt(req.tier)
        
        # 4. Generate Report
        # In a real app, this should be async (Celery/Background Tasks)
        # For Serverless, we might need to use Vercel's max duration or edge functions,
        # or return a job ID and poll. For MVP, we await (risk of timeout).
        report_content = ai_client.generate_report(system_prompt, context)
        
        return {"report": report_content}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
