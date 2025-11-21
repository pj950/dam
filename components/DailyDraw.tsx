"use client";

import { useState } from "react";

interface Lot {
    date: string;
    lot_id: number;
    title: string;
    meaning: string;
    lucky_direction: string;
}

export default function DailyDraw() {
    const [lot, setLot] = useState<Lot | null>(null);
    const [shaking, setShaking] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDraw = async () => {
        if (lot) return; // Already drawn

        setShaking(true);
        setLoading(true);

        // Simulate shaking animation delay
        setTimeout(async () => {
            try {
                const res = await fetch("/api/v1/daily/draw");
                const data = await res.json();
                setLot(data);
            } catch (err) {
                console.error("Failed to draw lot");
            } finally {
                setShaking(false);
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-serif text-gold-400 mb-8">Daily Fortune</h2>

            {!lot ? (
                <div
                    onClick={handleDraw}
                    className={`cursor-pointer relative w-64 h-96 mx-auto bg-gradient-to-b from-red-900 to-red-950 border-4 border-gold-400 rounded-xl flex items-center justify-center shadow-2xl transition-transform ${shaking ? "animate-shake" : "hover:scale-105"}`}
                >
                    <div className="text-gold-400 text-6xl font-serif">
                        {shaking ? "..." : "Draw"}
                    </div>
                    <p className="absolute bottom-8 text-gold-400/60 text-sm uppercase tracking-widest">
                        Tap to Shake
                    </p>
                </div>
            ) : (
                <div className="animate-in zoom-in duration-500 w-64 h-96 mx-auto bg-white text-black p-8 rounded-xl shadow-2xl flex flex-col items-center justify-between border-4 border-gold-400 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600" />

                    <div className="text-red-600 font-bold text-xl tracking-widest uppercase border-b-2 border-red-600 pb-2">
                        Lot #{lot.lot_id}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold">{lot.title}</h3>
                        <p className="text-sm text-gray-600 italic">"{lot.meaning}"</p>
                    </div>

                    <div className="w-full pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 uppercase">Lucky Direction</p>
                        <p className="font-bold text-red-600">{lot.lucky_direction}</p>
                    </div>
                </div>
            )}

            {lot && (
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Want a deeper interpretation based on your Bazi?</p>
                    <button className="px-6 py-2 bg-gold-400 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors text-sm">
                        Unlock VIP Insight
                    </button>
                </div>
            )}
        </div>
    );
}
