import React from 'react';

export default function RitualsPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-8 font-display">祈福点灯</h1>
                <p className="text-lg text-subtext-light dark:text-subtext-dark mb-12 max-w-2xl mx-auto">
                    点亮心灯，祈愿平安。在线供灯，积福纳祥。
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Ritual Card 1 */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg group hover:border-primary transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                                🕯️
                            </div>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">平安灯</h3>
                            <p className="text-subtext-light dark:text-subtext-dark mb-6">
                                祈求家人平安健康，诸事顺遂，消灾延寿。
                            </p>
                            <button className="w-full py-3 bg-primary text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity">
                                立即供灯
                            </button>
                        </div>
                    </div>

                    {/* Ritual Card 2 */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg group hover:border-primary transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                                📚
                            </div>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">智慧灯</h3>
                            <p className="text-subtext-light dark:text-subtext-dark mb-6">
                                开启智慧，学业有成，金榜题名，事业通达。
                            </p>
                            <button className="w-full py-3 bg-primary text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity">
                                立即供灯
                            </button>
                        </div>
                    </div>

                    {/* Ritual Card 3 */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg group hover:border-primary transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                                💰
                            </div>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">招财灯</h3>
                            <p className="text-subtext-light dark:text-subtext-dark mb-6">
                                财源广进，生意兴隆，正财偏财，皆得丰收。
                            </p>
                            <button className="w-full py-3 bg-primary text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity">
                                立即供灯
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
