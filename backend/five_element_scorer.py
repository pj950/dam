class FiveElementScorer:
    """
    Calculates the strength of Five Elements (Wu Xing) in the chart.
    Returns a dictionary with scores and percentages.
    """
    
    # Weights for calculation (Simplified logic)
    # Gan (Heavenly Stem): 10 points
    # Zhi (Earthly Branch):
    #   - Main Qi: ~20-30 points depending on season
    #   - Hidden Stems: Proportional
    
    # Element Map
    GAN_ELEMENTS = {
        "甲": "Wood", "乙": "Wood",
        "丙": "Fire", "丁": "Fire",
        "戊": "Earth", "己": "Earth",
        "庚": "Metal", "辛": "Metal",
        "壬": "Water", "癸": "Water"
    }
    
    ZHI_ELEMENTS = {
        "寅": "Wood", "卯": "Wood", # Spring
        "巳": "Fire", "午": "Fire", # Summer
        "申": "Metal", "酉": "Metal", # Autumn
        "亥": "Water", "子": "Water", # Winter
        "辰": "Earth", "戌": "Earth", "丑": "Earth", "未": "Earth" # Earth
    }
    
    @staticmethod
    def calculate(pillars: dict) -> dict:
        """
        pillars: {'year': Pillar, 'month': Pillar, ...}
        """
        scores = {"Wood": 0, "Fire": 0, "Earth": 0, "Metal": 0, "Water": 0}
        
        # Iterate through all pillars (Year, Month, Day, Hour)
        for pillar in pillars.values():
            # 1. Heavenly Stem (Gan)
            gan_el = FiveElementScorer.GAN_ELEMENTS.get(pillar.gan)
            if gan_el:
                scores[gan_el] += 10
                
            # 2. Earthly Branch (Zhi)
            # Simplified: Main Element gets 20 points
            # In advanced Bazi, we check month command and hidden stems.
            zhi_el = FiveElementScorer.ZHI_ELEMENTS.get(pillar.zhi)
            if zhi_el:
                scores[zhi_el] += 20
                
            # 3. Hidden Stems (Optional for more precision)
            # For MVP, we stick to Gan + Zhi main Qi
            
        # Calculate Total
        total = sum(scores.values())
        if total == 0: total = 1 # Avoid division by zero
        
        # Calculate Percentages
        percentages = {k: round((v / total) * 100, 1) for k, v in scores.items()}
        
        return {
            "scores": scores,
            "percentages": percentages,
            "strongest": max(scores, key=scores.get)
        }
