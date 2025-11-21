import React from 'react';
import Image from 'next/image';

const LAMPS = [
    "七星灯", "三宝灯", "九子离火灯", "五福灯", "传愿灯", "偏财灯", "健康灯", "发横财灯",
    "四季平安灯", "回财灯", "太岁灯", "好运灯", "姻缘灯", "安产灯", "平安灯", "忏悔灯",
    "招财灯", "文昌灯", "斩烂桃花灯", "智慧灯", "暴富灯", "本命灯", "正缘桃花灯", "求子灯",
    "消灾灯", "添寿灯", "爱宠无忧灯", "贵人灯", "追忆灯", "防小人灯", "除秽灯", "顺风顺水灯"
];

export default function RitualsPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-8 font-display">祈福点灯</h1>
                <p className="text-lg text-subtext-light dark:text-subtext-dark mb-12 max-w-2xl mx-auto">
                    点亮心灯，祈愿平安。在线供灯，积福纳祥。
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {LAMPS.map((lamp) => (
                        <div key={lamp} className="relative p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg group hover:border-primary transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
                                    <Image
                                        src={`/images/${lamp}.png`}
                                        alt={lamp}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">{lamp}</h3>
                                <button className="w-full py-2 bg-primary text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/20">
                                    立即供灯
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
