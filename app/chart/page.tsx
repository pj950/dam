"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BaziChart from "@/components/BaziChart";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

function ChartContent() {
    const searchParams = useSearchParams();
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const id = searchParams.get("id");

            // Case 1: Load by ID (Saved Chart)
            if (id) {
                try {
                    const { data, error } = await supabase
                        .from('bazi_charts')
                        .select('chart_data')
                        .eq('id', id)
                        .single();

                    if (error) throw error;
                    if (data && data.chart_data) {
                        setChartData(data.chart_data);
                    } else {
                        setError("Chart not found");
                    }
                } catch (err) {
                    console.error(err);
                    setError("Failed to load saved chart");
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Case 2: Calculate from Params (New Chart)
            const name = searchParams.get("name");
            const date = searchParams.get("date");
            const time = searchParams.get("time");
            const gender = searchParams.get("gender");

            if (!name || !date || !time) {
                setError("Missing information");
                setLoading(false);
                return;
            }

            try {
                const [year, month, day] = date.split("-").map(Number);
                const [hour, minute] = time.split(":").map(Number);

                // Call API
                // Note: In a real Vercel deployment, this would call /api/v1/chart/calculate

                try {
                    const { data } = await api.post("/chart/calculate", {
                        name,
                        gender,
                        year,
                        month,
                        day,
                        hour,
                        minute
                    });
                    setChartData(data);
                    toast.success("Chart calculated successfully!");
                } catch (apiError) {
                    // Fallback Mock for Demo if API is not reachable
                    console.warn("API failed, using mock data");
                    toast("Using offline mode", { icon: '⚠️' });
                    setChartData({
                        name,
                        gender: gender || 'male',
                        solar_date: `${date} ${time}`,
                        lunar_date: "Mock Lunar Date",
                        year_pillar: { gan: "甲", zhi: "子", gan_god: "Friend", zhi_gods: ["Friend"], hidden_stems: ["Gui"], nayin: "Gold", xingyun: "Good", shen_sha: ["Nobleman"] },
                        month_pillar: { gan: "乙", zhi: "丑", gan_god: "Rob Wealth", zhi_gods: ["Rob Wealth"], hidden_stems: ["Ji"], nayin: "Metal", xingyun: "Avg", shen_sha: [] },
                        day_pillar: { gan: "丙", zhi: "寅", gan_god: "Day Master", zhi_gods: ["Resource"], hidden_stems: ["Jia"], nayin: "Fire", xingyun: "Good", shen_sha: ["Star"] },
                        hour_pillar: { gan: "丁", zhi: "卯", gan_god: "Hurting Officer", zhi_gods: ["Officer"], hidden_stems: ["Yi"], nayin: "Fire", xingyun: "Bad", shen_sha: [] },
                        day_master: "丙",
                        day_master_strength: "Strong",
                        tai_yuan: "丁卯",
                        ming_gong: "戊辰",
                        shen_gong: "己巳",
                        special_patterns: [],
                        raw_data: { five_elements: { percentages: { Wood: 40, Fire: 30, Earth: 10, Metal: 10, Water: 10 } } }
                    });
                }
            } catch (err) {
                console.error(err);
                setError("Failed to calculate chart");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-pulse text-xl font-serif text-primary">正在推演天机...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <main className="py-12 px-4">
            {chartData && <BaziChart data={chartData} />}
        </main>
    );
}

export default function ChartPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark transition-colors duration-300">
            <div className="background-pattern">
                <Header />
                <Suspense fallback={
                    <div className="min-h-[80vh] flex items-center justify-center">
                        <div className="animate-pulse text-xl font-serif text-primary">加载中...</div>
                    </div>
                }>
                    <ChartContent />
                </Suspense>
                <Footer />
            </div>
        </div>
    );
}
