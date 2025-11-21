"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            setMessage({ type: 'success', text: '登录链接已发送到您的邮箱，请查收！' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || '发送失败，请稍后重试。' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark transition-colors duration-300">
            <div className="background-pattern">
                <Header />

                <main className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="w-full max-w-md p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-2xl relative overflow-hidden">
                        <div className="card-glow gradient-glow"></div>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-primary text-center mb-8">登录玄机阁</h1>

                            {message && (
                                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="email">
                                        邮箱地址
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg p-3 text-text-light dark:text-text-dark focus:ring-primary focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-gray-900 font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '发送中...' : '发送登录链接'}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-xs text-subtext-light dark:text-subtext-dark">
                                未注册邮箱将自动创建新账号。登录即代表您同意我们的服务条款和隐私政策。
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
