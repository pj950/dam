import sys
import os
# Add root to path
sys.path.append(os.getcwd())

from backend.bazi_engine import calculate_bazi
from backend.schemas import ChartRequest

def test_bazi_calculation():
    print("Testing Bazi Engine...")
    
    # Test Case: 1990-05-20 10:00
    req = ChartRequest(
        name="Test User",
        gender="male",
        year=1990,
        month=5,
        day=20,
        hour=10,
        minute=0
    )
    
    try:
        result = calculate_bazi(req)
        print(f"Calculation Successful for {result.name}")
        print(f"Solar Date: {result.solar_date}")
        print(f"Day Master: {result.day_master} ({result.day_master_strength})")
        print(f"Year Pillar: {result.year_pillar.gan}{result.year_pillar.zhi}")
        print(f"Month Pillar: {result.month_pillar.gan}{result.month_pillar.zhi}")
        print(f"Day Pillar: {result.day_pillar.gan}{result.day_pillar.zhi}")
        print(f"Hour Pillar: {result.hour_pillar.gan}{result.hour_pillar.zhi}")
        print(f"Special Patterns: {result.special_patterns}")
        
        # Verify output structure
        assert result.day_master is not None
        assert len(result.luck_pillars) > 0
        
        print("✅ Test Passed")
    except Exception as e:
        print(f"❌ Test Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_bazi_calculation()
