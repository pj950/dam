from lunar_python import Solar, Lunar, EightChar
from backend.schemas import ChartRequest, BaziChartResponse, Pillar
from backend.shen_sha_engine import ShenShaEngine
from backend.five_element_scorer import FiveElementScorer
from backend.interaction_engine import InteractionEngine

def calculate_bazi(request: ChartRequest) -> BaziChartResponse:
    # 1. Create Solar object
    solar = Solar.fromYmdHms(request.year, request.month, request.day, request.hour, request.minute, 0)
    
    # 2. Convert to Lunar
    lunar = solar.getLunar()
    
    # 3. Get EightChar (Bazi) object
    bazi = lunar.getEightChar()
    
    # 4. Extract Pillars
    year_gan = bazi.getYearGan()
    year_zhi = bazi.getYearZhi()
    month_gan = bazi.getMonthGan()
    month_zhi = bazi.getMonthZhi()
    day_gan = bazi.getDayGan()
    day_zhi = bazi.getDayZhi()
    hour_gan = bazi.getTimeGan()
    hour_zhi = bazi.getTimeZhi()
    
    # Shen Sha Calculation
    pillars_zhi = {
        "year": year_zhi,
        "month": month_zhi,
        "day": day_zhi,
        "hour": hour_zhi
    }
    shen_sha = ShenShaEngine.calculate(day_gan, day_zhi, year_zhi, month_zhi, pillars_zhi)
    
    # 5. Construct Response Pillars
    year_pillar = Pillar(
        gan=year_gan,
        zhi=year_zhi,
        gan_god=bazi.getYearShiShenGan(),
        zhi_gods=list(bazi.getYearShiShenZhi()),
        hidden_stems=list(bazi.getYearHideGan()),
        nayin=bazi.getYearNaYin(),
        xingyun=bazi.getYearDiShi(),
        shen_sha=shen_sha["year"]
    )
    
    month_pillar = Pillar(
        gan=month_gan,
        zhi=month_zhi,
        gan_god=bazi.getMonthShiShenGan(),
        zhi_gods=list(bazi.getMonthShiShenZhi()),
        hidden_stems=list(bazi.getMonthHideGan()),
        nayin=bazi.getMonthNaYin(),
        xingyun=bazi.getMonthDiShi(),
        shen_sha=shen_sha["month"]
    )
    
    day_pillar = Pillar(
        gan=day_gan,
        zhi=day_zhi,
        gan_god="Day Master",
        zhi_gods=list(bazi.getDayShiShenZhi()),
        hidden_stems=list(bazi.getDayHideGan()),
        nayin=bazi.getDayNaYin(),
        xingyun=bazi.getDayDiShi(),
        shen_sha=shen_sha["day"]
    )
    
    hour_pillar = Pillar(
        gan=hour_gan,
        zhi=hour_zhi,
        gan_god=bazi.getTimeShiShenGan(),
        zhi_gods=list(bazi.getTimeShiShenZhi()),
        hidden_stems=list(bazi.getTimeHideGan()),
        nayin=bazi.getTimeNaYin(),
        xingyun=bazi.getTimeDiShi(),
        shen_sha=shen_sha["hour"]
    )
    
    # Luck Pillars (Da Yun)
    yun = bazi.getYun(1 if request.gender == 'male' else 0)
    da_yun_arr = yun.getDaYun()
    luck_pillars = []
    for dy in da_yun_arr:
        gan_zhi = dy.getGanZhi()
        if len(gan_zhi) < 2:
            continue
            
        luck_pillars.append({
            "start_year": dy.getStartYear(),
            "end_year": dy.getEndYear(),
            "gan": gan_zhi[0],
            "zhi": gan_zhi[1]
        })
        
    # Special Patterns (Rule Engine Placeholder)
    special_patterns = []
    
    # Rule 1: Year Clash (Fan Yin)
    clashes = {
        "子": "午", "丑": "未", "寅": "申", "卯": "酉", "辰": "戌", "巳": "亥",
        "午": "子", "未": "丑", "申": "寅", "酉": "卯", "戌": "辰", "亥": "巳"
    }
    if clashes.get(day_zhi) == year_zhi:
        special_patterns.append("Day-Year Clash (Fan Yin)")
        
    # Interaction Engine
    interactions = InteractionEngine.calculate(pillars_zhi)
    special_patterns.extend(interactions)
    
    # Five Element Strength
    pillars_map = {
        "year": year_pillar,
        "month": month_pillar,
        "day": day_pillar,
        "hour": hour_pillar
    }
    five_elements = FiveElementScorer.calculate(pillars_map)
    
    # Day Master Strength (Updated logic using Five Elements)
    # If Day Master element is the strongest or 2nd strongest, consider Strong?
    # Or stick to Season support for now.
    season_support_cn = {
        "甲": ["亥", "子", "寅", "卯"],
        "乙": ["亥", "子", "寅", "卯"],
        "丙": ["寅", "卯", "巳", "午"],
        "丁": ["寅", "卯", "巳", "午"],
        "戊": ["巳", "午", "辰", "戌", "丑", "未"],
        "己": ["巳", "午", "辰", "戌", "丑", "未"],
        "庚": ["辰", "戌", "丑", "未", "申", "酉"],
        "辛": ["辰", "戌", "丑", "未", "申", "酉"],
        "壬": ["申", "酉", "亥", "子"],
        "癸": ["申", "酉", "亥", "子"]
    }
    
    if month_zhi in season_support_cn.get(day_gan, []):
        day_master_strength = "Strong"
    else:
        day_master_strength = "Weak"

    return BaziChartResponse(
        name=request.name,
        gender=request.gender,
        solar_date=solar.toFullString(),
        lunar_date=lunar.toFullString(),
        solar_term=lunar.getJieQi(),
        year_pillar=year_pillar,
        month_pillar=month_pillar,
        day_pillar=day_pillar,
        hour_pillar=hour_pillar,
        day_master=day_gan,
        day_master_strength=day_master_strength,
        tai_yuan=bazi.getTaiYuan(),
        ming_gong=bazi.getMingGong(),
        shen_gong=bazi.getShenGong(),
        luck_pillars=luck_pillars,
        special_patterns=special_patterns,
        raw_data={
            "solar": solar.toFullString(),
            "five_elements": five_elements
        }
    )
