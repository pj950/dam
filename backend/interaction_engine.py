class InteractionEngine:
    """
    Calculates interactions between pillars (Clashes, Combinations, Harms, Punishments).
    """
    
    @staticmethod
    def calculate(pillars: dict) -> list:
        """
        pillars: {'year': 'zhi', 'month': 'zhi', 'day': 'zhi', 'hour': 'zhi'}
        Returns list of interaction strings.
        """
        interactions = []
        
        # 1. Six Clashes (Liu Chong)
        clashes = {
            "子": "午", "丑": "未", "寅": "申", "卯": "酉", "辰": "戌", "巳": "亥",
            "午": "子", "未": "丑", "申": "寅", "酉": "卯", "戌": "辰", "亥": "巳"
        }
        
        # Check adjacent pillars for clashes (Year-Month, Month-Day, Day-Hour)
        pairs = [("year", "month"), ("month", "day"), ("day", "hour")]
        for p1, p2 in pairs:
            z1 = pillars[p1]
            z2 = pillars[p2]
            if clashes.get(z1) == z2:
                interactions.append(f"Clash: {p1.capitalize()}-{p2.capitalize()} ({z1}-{z2})")
                
        # 2. Six Combinations (Liu He)
        combos = {
            "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯",
            "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
        }
        
        for p1, p2 in pairs:
            z1 = pillars[p1]
            z2 = pillars[p2]
            if combos.get(z1) == z2:
                interactions.append(f"Combo: {p1.capitalize()}-{p2.capitalize()} ({z1}-{z2})")
                
        # 3. Three Harmonies (San He) - Simplified check (needs 3 branches)
        # (Shen, Zi, Chen), (Hai, Mao, Wei), (Yin, Wu, Xu), (Si, You, Chou)
        branches = list(pillars.values())
        if "申" in branches and "子" in branches and "辰" in branches:
            interactions.append("San He: Water Frame (Shen-Zi-Chen)")
        if "亥" in branches and "卯" in branches and "未" in branches:
            interactions.append("San He: Wood Frame (Hai-Mao-Wei)")
        if "寅" in branches and "午" in branches and "戌" in branches:
            interactions.append("San He: Fire Frame (Yin-Wu-Xu)")
        if "巳" in branches and "酉" in branches and "丑" in branches:
            interactions.append("San He: Metal Frame (Si-You-Chou)")
            
        return interactions
