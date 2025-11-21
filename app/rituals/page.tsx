"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LAMPS } from "@/lib/lamps";

export default function LampRitualPage() {
    const [selectedLamp, setSelectedLamp] = useState<typeof LAMPS[0] | null>(null);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark transition-colors duration-300">
            <div className="background-pattern">
                <Header />

                <main className="py-12 container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">祈福点灯</h1>
                        <p className="text-lg text-subtext-light dark:text-subtext-dark">
                            点亮心灯，上达天听。每一盏灯都承载着一份美好的祈愿。
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {LAMPS.map((lamp) => (
                            <div
                                key={lamp.id}
                                onClick={() => setSelectedLamp(lamp)}
                                className="group relative bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="aspect-square relative p-4 flex items-center justify-center bg-gradient-to-b from-transparent to-black/20">
                                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                                    <Image
                                        src={lamp.image}
                                        alt={lamp.name}
                                        width={200}
                                        height={200}
                                        className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 text-center relative z-10 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
                                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">{lamp.name}</h3>
                                    <p className="text-xs text-subtext-light dark:text-subtext-dark mt-1 line-clamp-1">{lamp.desc}</p>
                                    <button className="mt-3 w-full py-2 bg-primary/10 text-primary text-sm font-bold rounded hover:bg-primary hover:text-white transition-all">
                                        供灯祈福
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Modal */}
                {selectedLamp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedLamp(null)}>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl max-w-md w-full p-6 relative border border-primary/30 shadow-2xl shadow-primary/20" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedLamp(null)}
                                className="absolute top-4 right-4 text-subtext-light dark:text-subtext-dark hover:text-primary"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                                    <Image
                                        src={selectedLamp.image}
                                        alt={selectedLamp.name}
                                        width={128}
                                        height={128}
                                        className="object-contain relative z-10"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-primary mb-2">{selectedLamp.name}</h2>
                                <p className="text-text-light dark:text-text-dark mb-6">{selectedLamp.desc}</p>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="祈福人姓名"
                                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg p-3 text-text-light dark:text-text-dark focus:ring-primary focus:border-primary"
                                    />
                                    <textarea
                                        placeholder="祈愿内容..."
                                        rows={3}
                                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg p-3 text-text-light dark:text-text-dark focus:ring-primary focus:border-primary"
                                    ></textarea>

                                    <button className="w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-brand-red/30">
                                        确认供灯 (¥9.9)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
}
