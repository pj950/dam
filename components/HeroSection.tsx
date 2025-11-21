"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "1990-01-01T10:00", // Default format for datetime-local
        gender: "male",
        timezone: "CST"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Parse date
        const date = new Date(formData.birthdate);
        const query = new URLSearchParams({
            name: formData.name,
            gender: formData.gender,
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString(),
            day: date.getDate().toString(),
            hour: date.getHours().toString(),
            minute: date.getMinutes().toString(),
        });
        router.push(`/chart?${query.toString()}`);
    };

    return (
        <section className="py-20 md:py-32 bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(to bottom, rgba(16, 12, 8, 0) 0%, #100c08 100%), url('https://images.unsplash.com/photo-1594270433227-01a0dd40a830?q=80&w=2942&auto=format&fit=crop')" }}>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-4">洞悉天机 预见未来</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">输入生辰信息，获得源自东方智慧的AI深度解读与指引。</p>

                <div className="mt-12 max-w-lg mx-auto relative">
                    <div className="form-glow gradient-glow"></div>
                    <div className="relative z-10 bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-2xl border border-border-light dark:border-border-dark">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-left text-subtext-light dark:text-subtext-dark mb-1" htmlFor="name">姓名</label>
                                <input
                                    className="w-full bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-gray-500 text-text-light dark:text-text-dark p-3"
                                    id="name"
                                    placeholder="请输入您的姓名"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-left text-subtext-light dark:text-subtext-dark mb-1" htmlFor="birthdate">生辰</label>
                                <input
                                    className="w-full bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-gray-500 text-text-light dark:text-text-dark p-3"
                                    id="birthdate"
                                    type="datetime-local"
                                    value={formData.birthdate}
                                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-left text-subtext-light dark:text-subtext-dark mb-1" htmlFor="timezone">时区</label>
                                <select
                                    className="w-full bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-text-light dark:text-text-dark p-3"
                                    id="timezone"
                                    value={formData.timezone}
                                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                >
                                    <option value="CST">中国标准时间 (CST)</option>
                                    <option value="PST">太平洋标准时间 (PST)</option>
                                    <option value="EST">东部标准时间 (EST)</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-start space-x-4 pt-2">
                                <span className="text-sm font-medium text-subtext-light dark:text-subtext-dark">性别</span>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        className="text-brand-red focus:ring-brand-red"
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={formData.gender === "male"}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    />
                                    <span className="text-text-light dark:text-text-dark">乾 (男)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        className="text-brand-red focus:ring-brand-red"
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={formData.gender === "female"}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    />
                                    <span className="text-text-light dark:text-text-dark">坤 (女)</span>
                                </label>
                            </div>
                            <button
                                className="w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-red/30"
                                type="submit"
                            >
                                开启解读
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
