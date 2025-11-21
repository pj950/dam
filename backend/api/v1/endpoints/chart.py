from fastapi import APIRouter, Depends, HTTPException
from backend.schemas import ChartRequest, BaziChartResponse
from backend.bazi_engine import calculate_bazi

router = APIRouter()

@router.post("/calculate", response_model=BaziChartResponse)
def calculate_chart(request: ChartRequest):
    try:
        chart = calculate_bazi(request)
        return chart
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
