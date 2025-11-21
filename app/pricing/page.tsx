import React from 'react';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-8 font-display">服务定价</h1>
                <p className="text-lg text-subtext-light dark:text-subtext-dark mb-12 max-w-2xl mx-auto">
                    选择适合您的方案，开启深度命理解读之旅。
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg flex flex-col">
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">基础版</h3>
                        <div className="text-4xl font-bold text-primary mb-6">免费</div>
                        <ul className="space-y-4 text-left text-subtext-light dark:text-subtext-dark mb-8 flex-grow">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 每日一签</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 基础八字排盘</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 每日运势简批</li>
                        </ul>
                        <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors">
                            立即体验
                        </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border-2 border-primary shadow-xl transform md:-translate-y-4 flex flex-col">
                        <div className="absolute top-0 right-0 bg-primary text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            推荐
                        </div>
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">进阶版</h3>
                        <div className="text-4xl font-bold text-primary mb-6">¥98<span className="text-lg text-subtext-light dark:text-subtext-dark font-normal">/月</span></div>
                        <ul className="space-y-4 text-left text-subtext-light dark:text-subtext-dark mb-8 flex-grow">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 包含基础版所有功能</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 深度八字精批</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 流年运势详解</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 事业财运分析</li>
                        </ul>
                        <button className="w-full py-3 bg-primary text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                            立即订阅
                        </button>
                    </div>

                    {/* VIP Tier */}
                    <div className="relative p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg flex flex-col">
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">尊享版</h3>
                        <div className="text-4xl font-bold text-primary mb-6">¥298<span className="text-lg text-subtext-light dark:text-subtext-dark font-normal">/年</span></div>
                        <ul className="space-y-4 text-left text-subtext-light dark:text-subtext-dark mb-8 flex-grow">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 包含进阶版所有功能</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 祈福点灯服务 (每月1次)</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 合婚配对分析</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 专属客服支持</li>
                        </ul>
                        <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors">
                            立即订阅
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
