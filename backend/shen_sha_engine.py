class ShenShaEngine:
    """
    Calculates Symbolic Stars (Shen Sha) based on Bazi Chart.
    """
    
    @staticmethod
    def calculate(day_gan: str, day_zhi: str, year_zhi: str, month_zhi: str, pillars: dict) -> dict:
        """
        Returns a dictionary of stars for each pillar.
        pillars: {'year': 'zhi', 'month': 'zhi', 'day': 'zhi', 'hour': 'zhi'}
        """
        stars = {
            "year": [],
            "month": [],
            "day": [],
            "hour": []
        }
        
        # 1. Tian Yi Gui Ren (Nobleman) - Based on Day Gan or Year Gan
        # Simplified: Based on Day Gan
        nobleman_map = {
            "甲": ["丑", "未"], "戊": ["丑", "未"], "庚": ["丑", "未"],
            "乙": ["子", "申"], "己": ["子", "申"],
            "丙": ["亥", "酉"], "丁": ["亥", "酉"],
            "壬": ["巳", "卯"], "癸": ["巳", "卯"],
            "辛": ["午", "寅"]
        }
        
        nobles = nobleman_map.get(day_gan, [])
        for p_name, p_zhi in pillars.items():
            if p_zhi in nobles:
                stars[p_name].append("Nobleman (天乙贵人)")

        # 2. Yi Ma (Traveling Horse) - Based on Day Zhi or Year Zhi
        # Group: (Shen, Zi, Chen) -> Yin
        # Group: (Yin, Wu, Xu) -> Shen
        # Group: (Hai, Mao, Wei) -> Si
        # Group: (Si, You, Chou) -> Hai
        
        def get_horse(zhi):
            if zhi in ["申", "子", "辰"]: return "寅"
            if zhi in ["寅", "午", "戌"]: return "申"
            if zhi in ["亥", "卯", "未"]: return "巳"
            if zhi in ["巳", "酉", "丑"]: return "亥"
            return None
            
        horse_day = get_horse(day_zhi)
        horse_year = get_horse(year_zhi)
        
        for p_name, p_zhi in pillars.items():
            if p_zhi == horse_day or p_zhi == horse_year:
                stars[p_name].append("Traveling Horse (驿马)")

        # 3. Tao Hua (Peach Blossom) - Based on Day Zhi or Year Zhi
        # (Shen, Zi, Chen) -> You
        # (Yin, Wu, Xu) -> Mao
        # (Hai, Mao, Wei) -> Zi
        # (Si, You, Chou) -> Wu
        
        def get_peach(zhi):
            if zhi in ["申", "子", "辰"]: return "酉"
            if zhi in ["寅", "午", "戌"]: return "卯"
            if zhi in ["亥", "卯", "未"]: return "子"
            if zhi in ["巳", "酉", "丑"]: return "午"
            return None
            
        peach_day = get_peach(day_zhi)
        peach_year = get_peach(year_zhi)
        
        for p_name, p_zhi in pillars.items():
            if p_zhi == peach_day or p_zhi == peach_year:
                stars[p_name].append("Peach Blossom (桃花)")
                
        return stars
