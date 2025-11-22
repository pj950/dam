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
            }, 1200); // Slightly longer for the fall animation
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
                <div className="relative h-[600px] flex items-center justify-center perspective-container">
                    {/* Interactive Container */}
                    <div
                        onClick={handleDraw}
                        className={`relative cursor-pointer transition-transform duration-300 ${shaking ? "animate-shake" : "hover:scale-105"}`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* --- High-Fidelity CSS 3D Cylinder --- */}

                        {/* 1. Back Rim (Inner Top) - Pushed back for depth */}
                        <div className="absolute -top-8 left-0 w-56 h-16 bg-[#3E1C03] rounded-[100%] transform translate-z-[-40px] shadow-inner"></div>

                        {/* 2. Sticks Container (Inside) - Positioned in the middle */}
                        <div className={`absolute -top-16 left-0 w-56 h-40 flex justify-center items-end overflow-visible z-0 ${shaking ? "animate-sticks-shake" : ""}`} style={{ transform: 'translateZ(-10px)' }}>
                            {/* Render multiple sticks for volume */}
                            <div className="relative w-40 h-full">
                                {[...Array(15)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute bottom-0 w-3 bg-gradient-to-r from-[#D2B48C] to-[#C19A6B] border-x border-[#8B4513]/50 rounded-t-sm shadow-sm origin-bottom"
                                        style={{
                                            height: `${120 + Math.random() * 50}px`,
                                            left: `${5 + Math.random() * 90}%`,
                                            transform: `rotate(${Math.random() * 30 - 15}deg) translateZ(${Math.random() * 20 - 10}px)`, // Randomize slightly around the container's Z
                                            zIndex: i
                                        }}
                                    >
                                        {/* Stick details (red tip) */}
                                        <div className="w-full h-2 bg-brand-red/80 absolute top-2 opacity-70"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Falling Stick Animation (Popping out) */}
                        {falling && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-64 bg-gradient-to-r from-[#D2B48C] to-[#C19A6B] border border-[#8B4513] rounded-sm z-50 animate-fall-out shadow-xl origin-bottom">
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[12px] text-[#8B4513] font-bold writing-vertical-rl opacity-90">每日一签</div>
                                <div className="w-full h-3 bg-brand-red absolute top-2"></div>
                            </div>
                        )}

                        {/* 4. Front Body (Main Cylinder) - Pulled forward */}
                        <div className="w-56 h-80 relative z-10 rounded-b-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform translate-z-[20px]">
                            {/* Base Gradient (Cylinder Shape) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#5D2906] via-[#A0522D] to-[#5D2906]"></div>

                            {/* Wood Grain Texture Overlay */}
                            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#3E1C03_10px,#3E1C03_12px)] mix-blend-overlay"></div>

                            {/* Vertical Highlights (Cylindrical Shine) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-white/10 to-black/40 pointer-events-none"></div>

                            {/* Bamboo Nodes (Horizontal Lines) */}
                            <div className="absolute top-1/4 w-full h-1 bg-[#3E1C03]/60 blur-[1px] shadow-sm"></div>
                            <div className="absolute bottom-1/4 w-full h-1 bg-[#3E1C03]/60 blur-[1px] shadow-sm"></div>

                            {/* Character Badge */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-28 h-28 border-4 border-[#D4AF37]/80 rounded-full flex items-center justify-center bg-gradient-to-br from-[#5D2906] to-[#3E1C03] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                                    <span className="text-5xl font-serif text-[#D4AF37] font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">签</span>
                                </div>
                            </div>
                        </div>

                        {/* 5. Front Rim (Outer Top Lip) - Pulled forward with body */}
                        <div className="absolute -top-8 left-0 w-56 h-16 bg-gradient-to-b from-[#8B4513] to-[#5D2906] rounded-[100%] border-b border-[#3E1C03]/50 z-20 shadow-md transform translate-z-[20px]">
                            {/* Inner shadow to suggest opening depth */}
                            <div className="absolute top-1 left-1 right-1 bottom-1 bg-[#2A1202] rounded-[100%] shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]"></div>
                        </div>

                        {/* 6. Fallen Stick (Result) - Resting ON TOP of the cylinder */}
                        {stickVisible && (
                            <div
                                onClick={revealResult}
                                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-80 bg-gradient-to-r from-[#E6CFA3] to-[#D2B48C] border-2 border-[#8B4513] rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center hover:brightness-110 transition-all z-50 animate-land-on-cylinder cursor-pointer origin-center rotate-12"
                            >
                                <span className="writing-vertical-rl text-[#8B4513] font-bold font-serif text-xl tracking-widest py-6">
                                    点击解签
                                </span>
                                <div className="w-full h-4 bg-brand-red absolute top-2"></div>
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-[#D4AF37] text-lg animate-pulse whitespace-nowrap font-bold drop-shadow-md bg-black/50 px-3 py-1 rounded-full">
                                    点击查看
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Instruction Text */}
                    {!shaking && !falling && !stickVisible && (
                        <p className="absolute bottom-10 text-gold-400/80 text-sm uppercase tracking-widest animate-pulse font-bold drop-shadow-md">
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
                .perspective-container {
                    perspective: 1000px;
                }
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg) translateY(0); }
                    25% { transform: rotate(-5deg) translateY(-10px); }
                    50% { transform: rotate(0deg) translateY(0); }
                    75% { transform: rotate(5deg) translateY(-10px); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both infinite;
                }
                @keyframes sticks-shake {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-sticks-shake {
                    animation: sticks-shake 0.2s ease-in-out infinite;
                }
                @keyframes fall-out {
                    0% { transform: translate(-50%, 0) rotate(0deg); opacity: 0; bottom: 0; }
                    10% { opacity: 1; }
                    50% { transform: translate(-50%, -250px) rotate(180deg); }
                    100% { transform: translate(-50%, 50px) rotate(360deg) scale(1.2); }
                }
                .animate-fall-out {
                    animation: fall-out 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                @keyframes land-on-cylinder {
                    0% { opacity: 0; transform: translate(-50%, -100px) rotate(0deg) scale(0.5); }
                    100% { opacity: 1; transform: translate(-50%, 0) rotate(12deg) scale(1); }
                }
                .animate-land-on-cylinder {
                    animation: land-on-cylinder 0.5s ease-out forwards;
                }
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                    text-orientation: upright;
                }
            `}</style>
        </div>
    );
}
