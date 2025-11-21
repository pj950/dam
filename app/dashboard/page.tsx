"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface SavedChart {
    id: string;
    name: string;
    gender: string;
    birth_year: number;
    birth_month: number;
    birth_day: number;
    birth_hour: number;
    created_at: string;
}

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [charts, setCharts] = useState<SavedChart[]>([]);
    const [loadingCharts, setLoadingCharts] = useState(true);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        async function fetchCharts() {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('bazi_charts')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setCharts(data || []);
            } catch (error) {
                console.error('Error fetching charts:', error);
            } finally {
                setLoadingCharts(false);
            }
        }

        fetchCharts();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("确定要删除这个命盘记录吗？")) return;

        try {
            const { error } = await supabase
                .from('bazi_charts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCharts(charts.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting chart:', error);
            alert("删除失败，请重试");
        }
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark transition-colors duration-300">
            <div className="background-pattern">
                <Header />

                <main className="container mx-auto px-6 py-12 min-h-[80vh]">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">个人中心</h1>
                        <Link href="/" className="bg-primary text-gray-900 font-bold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity">
                            + 新建命盘
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar / User Info */}
                        <div className="md:col-span-1">
                            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg truncate max-w-[150px]">{user.email}</h2>
                                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">普通会员</span>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg">
                                        我的命盘
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-subtext-light dark:text-subtext-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 rounded-lg transition-colors">
                                        每日运势记录
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-subtext-light dark:text-subtext-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 rounded-lg transition-colors">
                                        祈福点灯记录
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-subtext-light dark:text-subtext-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 rounded-lg transition-colors">
                                        账号设置
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content / Charts List */}
                        <div className="md:col-span-2">
                            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-lg min-h-[500px]">
                                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 pb-4 border-b border-border-light dark:border-border-dark">
                                    我的命盘 ({charts.length})
                                </h2>

                                {loadingCharts ? (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                    </div>
                                ) : charts.length === 0 ? (
                                    <div className="text-center py-12 text-subtext-light dark:text-subtext-dark">
                                        <p className="mb-4">暂无保存的命盘记录</p>
                                        <Link href="/" className="text-primary hover:underline">
                                            立即去测算
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {charts.map((chart) => (
                                            <div key={chart.id} className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors group">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif font-bold">
                                                        {chart.name[0]}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-text-light dark:text-text-dark">{chart.name}</h3>
                                                        <p className="text-xs text-subtext-light dark:text-subtext-dark">
                                                            {chart.gender === 'male' ? '乾造' : '坤造'} • {chart.birth_year}年{chart.birth_month}月{chart.birth_day}日
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Link
                                                        href={`/chart?id=${chart.id}`} // Assuming chart page can load by ID
                                                        className="px-3 py-1.5 text-xs bg-primary text-gray-900 font-bold rounded hover:opacity-90 transition-opacity"
                                                    >
                                                        查看
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(chart.id)}
                                                        className="p-1.5 text-subtext-light dark:text-subtext-dark hover:text-red-500 transition-colors"
                                                        title="删除"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
