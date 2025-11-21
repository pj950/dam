from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class ChartRequest(BaseModel):
    name: str
    gender: str # 'male' or 'female'
    year: int
    month: int
    day: int
    hour: int
    minute: int = 0
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class Pillar(BaseModel):
    gan: str # Heavenly Stem
    zhi: str # Earthly Branch
    gan_god: str # Ten God of Stem
    zhi_gods: List[str] # Ten Gods of Hidden Stems
    hidden_stems: List[str]
    nayin: str # Na Yin
    xingyun: str # 12 Life Stages (Chang Sheng)
    shen_sha: List[str] = [] # Symbolic Stars

class BaziChartResponse(BaseModel):
    name: str
    gender: str
    solar_date: str
    lunar_date: str
    solar_term: str
    
    # Four Pillars
    year_pillar: Pillar
    month_pillar: Pillar
    day_pillar: Pillar
    hour_pillar: Pillar
    
    # Day Master info
    day_master: str
    day_master_strength: str # Weak/Strong (Basic estimation)
    
    # Advanced Details (Professional)
    tai_yuan: Optional[str] = None
    ming_gong: Optional[str] = None
    shen_gong: Optional[str] = None
    
    # Luck Pillars (Da Yun)
    luck_pillars: List[Dict[str, Any]]
    
    # Special findings (Rule Engine)
    special_patterns: List[str]
    
    # Raw JSON for frontend caching
    raw_data: Dict[str, Any]
