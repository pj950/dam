import { NextResponse } from "next/server";

export interface Lot {
    lot_id: number;
    title: string;
    poem_text: string; // 诗曰
    poem_meaning: string; // 诗意
    explanation: string; // 解曰
    detailed_explanation: string; // 详解
    prediction: Record<string, string>; // 仙机
    interpretation: {
        essence: string; // 本签精髓
        advice: string; // 凡事做事
        comprehensive: string; // 全面详解
    };
    ai_interpretation: string; // 大师现代解读
}

const LOTS: Lot[] = [
    {
        lot_id: 1,
        title: "第一签 甲甲 大吉",
        poem_text: "巍巍独步向云间\n玉殿千官第一班\n富贵荣华天付汝\n福如东海寿如山",
        poem_meaning: "此签主独步云间，超群拔萃之象。",
        explanation: "谋望遂意，福寿绵长。官员占此，有超越之喜；士人有功名之庆；占前程者，福寿绵长；占事业者，根基稳固。",
        detailed_explanation: "此签大吉，为十八学士登瀛洲之象。意指求得此签者，将平步青云，步步高升，并且进身玉殿，在百官之上。富贵荣华，将有福厚如海、寿高如山的幸运。",
        prediction: {
            "功名": "遂",
            "福禄": "全",
            "讼": "得理",
            "病": "即痊",
            "婚姻": "圆",
            "行人": "还"
        },
        interpretation: {
            essence: "天时相助，平步青云。",
            advice: "凡事顺应天道，积德行善，自有天佑。",
            comprehensive: "这是一支非常吉祥的签。如果你正在谋求功名或事业，现在是最好的时机。你的努力将会得到上天的回报，不仅地位提升，财富和寿命也会随之而来。但切记不可骄傲自满，应保持谦逊，多行善事，以保长久之福。"
        },
        ai_interpretation: "此签为大吉之兆，象征着事业与生活都将迎来巅峰时刻。'巍巍独步向云间'暗示你在专业领域或职场上将获得极高的声望与地位，无人能及。'玉殿千官第一班'则预示着升迁或考试第一的可能。建议把握当下的好运势，大胆推行计划，同时保持谦虚谨慎的态度，福气将如东海之水源源不绝。"
    },
    {
        lot_id: 2,
        title: "第二签 甲乙 上吉",
        poem_text: "盈虚消息总天时\n自此君当百事宜\n若问前程归宿地\n更须方寸好修为",
        poem_meaning: "此签主盛衰消长由天定，修身养性福自来。",
        explanation: "否极泰来，诸事适宜。过去可能不顺利，但从现在开始会逐渐好转。然而，这并非意味着可以骄纵懈怠，关键在于内心的修为。",
        detailed_explanation: "此签为张子房游赤松之象。意指世间万物的盛衰消长都由天时决定，人生中的穷通得失亦是如此。若要前程远大，最终有所成就，关键在于内心的修为和善行。",
        prediction: {
            "谋事": "缓成",
            "功名": "有",
            "求财": "平",
            "婚姻": "合",
            "讼": "和",
            "病": "祷"
        },
        interpretation: {
            essence: "心正运自来。",
            advice: "存善念，勿妄动。凡事不可操之过急，欲速则不达。",
            comprehensive: "这支签告诉你，运势的好坏是天定的，但个人的修为可以改变命运。现在你的运势开始好转，适合做各种事情。但要注意，不要急于求成，要注重内心的修养，多做善事，这样你的前程才会更加光明。"
        },
        ai_interpretation: "此签为上吉，强调'修身'的重要性。'盈虚消息总天时'说明时机已到，之前的困顿将一扫而空。'自此君当百事宜'预示着顺境的开始。但最关键的是'方寸好修为'，即你的内心和品德。AI建议：现在是积累福报和提升自我的好时机，不要急功近利，稳扎稳打，你的善良和正直将是你最大的财富，也会为你带来长久的成功。"
    },
    // Placeholder for more lots...
    {
        lot_id: 3,
        title: "第三签 甲丙 中吉",
        poem_text: "衣食自然生处有\n劝君不用苦劳心\n但能孝悌存忠信\n福禄来成祸不侵",
        poem_meaning: "此签主顺其自然，修德获福。",
        explanation: "命里有时终须有，命里无时莫强求。只要坚守孝悌忠信，福禄自然会来，灾祸也会远离。",
        detailed_explanation: "此签为贾谊遇汉文帝之象。劝人不必过于执着于物质追求，只要品德高尚，生活自然无忧。",
        prediction: {
            "求财": "有",
            "功名": "迟",
            "婚姻": "合",
            "病": "安"
        },
        interpretation: {
            essence: "修德远祸。",
            advice: "顺其自然，不要强求。注重家庭和谐与个人品德。",
            comprehensive: "这是一支劝人修身养性的签。不要为了衣食过于劳累，只要你做人忠诚、孝顺，好运自然会眷顾你。保持平和的心态，不要过于焦虑。"
        },
        ai_interpretation: "此签为中吉，主张'无为而治'的生活哲学。它不是让你躺平，而是告诉你不要为了追求物质而过度消耗自己。'衣食自然生处有'说明你的基本生活是有保障的。重点在于'孝悌存忠信'，即人际关系和道德品质。AI建议：关注家庭，真诚待人，你的好人缘会转化为你的贵人运，帮你化解潜在的危机。"
    }
];

export async function GET() {
    // Simulate random draw
    const randomIndex = Math.floor(Math.random() * LOTS.length);
    const lot = LOTS[randomIndex];

    return NextResponse.json(lot);
}
