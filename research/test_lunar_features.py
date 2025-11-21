import sys
import os
# Add root to path
sys.path.append(os.getcwd())

from lunar_python import Solar, Lunar

def research_lunar_python():
    print("Researching lunar-python Advanced Features...")
    
    # 1990-05-20 10:00
    solar = Solar.fromYmdHms(1990, 5, 20, 10, 0, 0)
    lunar = solar.getLunar()
    bazi = lunar.getEightChar()
    
    print(f"Chart: {bazi.getYearGan()}{bazi.getYearZhi()} {bazi.getMonthGan()}{bazi.getMonthZhi()} {bazi.getDayGan()}{bazi.getDayZhi()} {bazi.getTimeGan()}{bazi.getTimeZhi()}")

    # 1. Tai Yuan (Fetus), Ming Gong (Life), Shen Gong (Body)
    print("\n--- Tai/Ming/Shen ---")
    try:
        print(f"Tai Yuan: {bazi.getTaiYuan()}")
    except: print("Tai Yuan: Not found directly")
        
    try:
        print(f"Ming Gong: {bazi.getMingGong()}")
    except: print("Ming Gong: Not found directly")
    
    try:
        print(f"Shen Gong: {bazi.getShenGong()}")
    except: print("Shen Gong: Not found directly")

    # 2. Shen Sha (Symbolic Stars)
    print("\n--- Shen Sha ---")
    # lunar-python might have ShenSha built-in or we need to calculate
    try:
        # Check for common stars
        print(f"Year ShenSha: {bazi.getYearShenSha()}") # Hypothetical
    except: print("Year ShenSha: Not found directly")
    
    try:
        # Check Day ShenSha
        print(f"Day ShenSha: {bazi.getDayShenSha()}") # Hypothetical
    except: print("Day ShenSha: Not found directly")

    # 3. Five Elements
    print("\n--- Five Elements ---")
    try:
        print(f"Wu Xing: {bazi.getWuXing()}") # Hypothetical
    except: print("Wu Xing: Not found directly")

if __name__ == "__main__":
    research_lunar_python()
