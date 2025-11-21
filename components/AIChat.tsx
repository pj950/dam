"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Greetings. I am the Master of the Eastern Temple. How may I guide your destiny today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            // Call API
            const res = await fetch("/api/v1/chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}` // Add token if integrated
                },
                body: JSON.stringify({
                    messages: [...messages, userMsg]
                })
            });

            const data = await res.json();
            const aiMsg: Message = { role: "assistant", content: data.response || "The stars are silent." };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "assistant", content: "Connection to the ethereal plane interrupted." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-black/30 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-200"}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 text-gray-200 p-3 rounded-lg animate-pulse">
                            Consulting the oracle...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                <input
                    className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold-400 focus:outline-none"
                    placeholder="Ask the Master..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="px-4 py-2 bg-gold-400 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
