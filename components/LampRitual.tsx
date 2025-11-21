"use client";

import { useState } from "react";

interface LampProps {
    type: "wealth" | "love" | "health";
    price: string;
    onSelect: () => void;
}

const LampCard = ({ type, price, onSelect }: LampProps) => {
    const colors = {
        wealth: "from-yellow-400 to-orange-500",
        love: "from-pink-400 to-red-500",
        health: "from-green-400 to-emerald-600",
    };

    return (
        <div
            onClick={onSelect}
            className="cursor-pointer group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-all hover:scale-105"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors[type]} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
            <h3 className="text-xl font-serif text-white capitalize mb-2">{type} Lamp</h3>
            <p className="text-gold-400 font-bold">{price}</p>
            <div className={`mt-4 w-16 h-16 rounded-full bg-gradient-to-t ${colors[type]} blur-md mx-auto opacity-50 group-hover:opacity-100 transition-opacity animate-pulse`} />
        </div>
    );
};

export default function LampRitual() {
    const [selectedLamp, setSelectedLamp] = useState<string | null>(null);
    const [wish, setWish] = useState("");

    const handlePayment = async () => {
        if (!selectedLamp) return;

        // Call API to create checkout session
        try {
            const res = await fetch("/api/v1/payment/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    price_id: "price_123", // Mock Price ID
                    success_url: window.location.origin + "/rituals/success",
                    cancel_url: window.location.origin + "/rituals",
                    mode: "payment"
                })
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error(err);
            alert("Payment initialization failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
                <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-300">
                    Digital Rituals
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Light a lamp in our cyber temple to manifest your intentions.
                    The energy of the algorithm aligns with your will.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <LampCard type="wealth" price="$18.88" onSelect={() => setSelectedLamp("wealth")} />
                <LampCard type="love" price="$18.88" onSelect={() => setSelectedLamp("love")} />
                <LampCard type="health" price="$18.88" onSelect={() => setSelectedLamp("health")} />
            </div>

            {selectedLamp && (
                <div className="animate-in slide-in-from-bottom duration-500 p-8 bg-white/5 rounded-2xl border border-white/10 max-w-xl mx-auto">
                    <h3 className="text-2xl font-serif text-white mb-6 capitalize">
                        Light the {selectedLamp} Lamp
                    </h3>
                    <textarea
                        className="w-full p-4 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-400 focus:outline-none mb-6"
                        rows={4}
                        placeholder="Write your intention or wish here..."
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                    />
                    <button
                        onClick={handlePayment}
                        className="w-full py-3 bg-gradient-to-r from-gold-400 to-orange-500 text-black font-bold rounded-lg hover:scale-[1.02] transition-transform"
                    >
                        Proceed to Offering ($18.88)
                    </button>
                </div>
            )}
        </div>
    );
}
