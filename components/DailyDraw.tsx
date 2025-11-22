"use client";

import { useState, useEffect } from "react";

interface Lot {
    date: string;
    lot_id: number;
    title: string;
    meaning: string;
    lucky_direction: string;
    ai_interpretation: string;
}

export default function DailyDraw() {
    const [lot, setLot] = useState<Lot | null>(null);
    const [shaking, setShaking] = useState(false);
    const [falling, setFalling] = useState(false);
    const [stickVisible, setStickVisible] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [displayedAiText, setDisplayedAiText] = useState("");

    const handleDraw = async () => {
        if (shaking || falling || stickVisible || showResult) return;

        setShaking(true);

        // Simulate shaking duration
        setTimeout(() => {
            setShaking(false);
            setFalling(true);

            // Simulate stick falling out
            setTimeout(async () => {
                setFalling(false);
                setStickVisible(true);

                try {
                    const res = await fetch("/api/v1/daily/draw");
                    const data = await res.json();
                    setLot(data);
                } catch (err) {
                    console.error("Failed to draw lot");
                    // Reset on error
                    setStickVisible(false);
                }
            }, 1000);
        }, 2000);
    };

    const revealResult = () => {
        setStickVisible(false);
        setShowResult(true);
        setAiLoading(true);

        // Simulate AI generation delay
        setTimeout(() => {
            setAiLoading(false);
            if (lot) {
                startTypewriter(lot.ai_interpretation);
            }
        }, 1500);
    };

    const startTypewriter = (text: string) => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedAiText(text.substring(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
            }
        }, 30);
    };

    return (
        <div className="max-w-2xl mx-auto text-center px-4">
            <h2 className="text-4xl font-serif text-gold-400 mb-12 font-display">每日一签</h2>

            {!showResult ? (
                <div className="relative h-[600px] flex items-center justify-center">
                    {/* Bamboo Cylinder Container */}
                    <div
                        onClick={handleDraw}
                        className={`relative cursor-pointer transition-transform ${shaking ? "animate-shake" : "hover:scale-105"}`}
                    >
                        {/* Cylinder Body */}
                        <div className="w-56 h-80 bg-gradient-to-b from-[#8B4513] via-[#A0522D] to-[#5D2906] rounded-lg relative overflow-hidden border-4 border-[#3E1C03] shadow-[10px_10px_30px_rgba(0,0,0,0.5)] z-20 transform perspective-1000 rotate-x-10">
                            {/* Bamboo Texture Lines */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                            {/* Vertical Highlights for 3D effect */}
                            <div className="absolute top-0 left-4 w-2 h-full bg-white/10 blur-sm"></div>
                            <div className="absolute top-0 right-8 w-4 h-full bg-black/20 blur-md"></div>

                            <div className="absolute top-12 w-full h-1.5 bg-[#3E1C03]/60 shadow-sm"></div>
                            <div className="absolute bottom-12 w-full h-1.5 bg-[#3E1C03]/60 shadow-sm"></div>

                            {/* Character on Cylinder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-28 h-28 border-4 border-[#D4AF37] rounded-full flex items-center justify-center bg-[#5D2906] shadow-inner">
                                    <span className="text-5xl font-serif text-[#D4AF37] font-bold drop-shadow-md">签</span>
                                </div>
                            </div>
                        </div>

                        {/* Cylinder Opening (Top) - Ellipse for 3D effect */}
                        <div className="absolute -top-6 left-0 w-56 h-12 bg-[#5D2906] rounded-[100%] border-4 border-[#3E1C03] z-10 shadow-inner bg-gradient-to-r from-[#3E1C03] to-[#6B3410]"></div>

                        {/* Sticks inside (Visual only) */}
                        {!falling && !stickVisible && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-20 z-0">
                                <div className="absolute left-4 top-6 w-3 h-32 bg-[#D2B48C] rotate-[-15deg] rounded-t-sm border border-[#8B4513] shadow-sm"></div>
                                <div className="absolute left-12 top-4 w-3 h-36 bg-[#D2B48C] rotate-[-5deg] rounded-t-sm border border-[#8B4513] shadow-sm"></div>
                                <div className="absolute right-12 top-5 w-3 h-34 bg-[#D2B48C] rotate-[5deg] rounded-t-sm border border-[#8B4513] shadow-sm"></div>
                                <div className="absolute right-4 top-8 w-3 h-32 bg-[#D2B48C] rotate-[15deg] rounded-t-sm border border-[#8B4513] shadow-sm"></div>
                                {/* More sticks for fullness */}
                                <div className="absolute left-8 top-8 w-3 h-30 bg-[#D2B48C] rotate-[-10deg] rounded-t-sm border border-[#8B4513] -z-10"></div>
                                <div className="absolute right-8 top-7 w-3 h-30 bg-[#D2B48C] rotate-[10deg] rounded-t-sm border border-[#8B4513] -z-10"></div>
                            </div>
                        )}

                        {/* Falling Stick Animation */}
                        {falling && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3 h-48 bg-[#D2B48C] border border-[#8B4513] rounded-sm z-30 animate-fall-out shadow-md">
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] text-[#8B4513] font-bold writing-vertical-rl">每日一签</div>
                            </div>
                        )}
                    </div>

                    {/* Fallen Stick (Clickable) */}
                    {stickVisible && (
                        <div
                            onClick={revealResult}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20 cursor-pointer animate-bounce-slow z-40"
                        >
                            <div className="w-8 h-72 bg-[#D2B48C] border-2 border-[#8B4513] rounded-md shadow-2xl flex items-center justify-center hover:bg-[#E6CFA3] transition-colors">
                                <span className="writing-vertical-rl text-[#8B4513] font-bold font-serif text-xl tracking-widest py-6">
                                    点击解签
                                </span>
                            </div>
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-[#D4AF37] text-base animate-pulse whitespace-nowrap font-bold drop-shadow-md">
                                点击查看签文
                            </div>
                        </div>
                    )}

                    {/* Instruction Text */}
                    {!shaking && !falling && !stickVisible && (
                        <p className="absolute bottom-0 text-gold-400/60 text-sm uppercase tracking-widest animate-pulse">
                            点击竹筒摇签
                        </p>
                    )}
                </div>
            ) : (
                <div className="animate-in zoom-in duration-500 max-w-md mx-auto">
                    {/* Result Card */}
                    <div className="bg-[#FFF8F0] text-black p-8 rounded-xl shadow-2xl border-4 border-gold-400 relative overflow-hidden mb-8">
                        <div className="absolute top-0 left-0 w-full h-2 bg-brand-red" />
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-red" />

                        <div className="text-brand-red font-bold text-xl tracking-widest uppercase border-b-2 border-brand-red pb-2 mb-6">
                            第 {lot?.lot_id} 签
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-4xl font-serif font-bold text-gray-900">{lot?.title}</h3>
                            <p className="text-lg text-gray-600 italic font-serif">"{lot?.meaning}"</p>
                        </div>

                        <div className="w-full pt-6 mt-6 border-t border-gray-200">
                            <p className="text-xs text-gray-500 uppercase mb-1">吉利方位</p>
                            <p className="font-bold text-brand-red text-lg">{lot?.lucky_direction}</p>
                        </div>
                    </div>

                    {/* AI Interpretation Section */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gold-400/30 shadow-lg text-left">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold-400 to-yellow-200 flex items-center justify-center mr-3">
                                <span className="text-xs font-bold text-black">AI</span>
                            </div>
                            <h4 className="text-lg font-bold text-gold-400">大师解签</h4>
                        </div>

                        <div className="min-h-[150px] text-sm leading-relaxed text-text-light dark:text-text-dark/90">
                            {aiLoading ? (
                                <div className="flex items-center space-x-2 text-gold-400/70">
                                    <span className="animate-pulse">正在推演天机...</span>
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap font-serif">{displayedAiText}</p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setShowResult(false);
                            setLot(null);
                            setDisplayedAiText("");
                        }}
                        className="mt-8 px-8 py-3 bg-gold-400 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors shadow-lg shadow-gold-400/20"
                    >
                        再求一签
                    </button>
                </div>
            )}

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
                }
                @keyframes fall-out {
                    0% { transform: translate(-50%, 0) rotate(0deg); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translate(-50%, -150px) rotate(720deg); opacity: 0; }
                }
                .animate-fall-out {
                    animation: fall-out 1s ease-out forwards;
                }
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                    text-orientation: upright;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translate(-50%, 80px); }
                    50% { transform: translate(-50%, 90px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite;
                }
            `}</style>
        </div>
    );
}
