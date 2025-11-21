"use client";

interface PillarData {
    gan: string;
    zhi: string;
    gan_god: string;
    zhi_gods: string[];
    hidden_stems: string[];
    nayin: string;
    xingyun: string;
    shen_sha: string[];
}

interface ChartData {
    name: string;
    solar_date: string;
    lunar_date: string;
    day_master: string;
    day_master_strength: string;
    year_pillar: PillarData;
    month_pillar: PillarData;
    day_pillar: PillarData;
    hour_pillar: PillarData;
    tai_yuan: string;
    ming_gong: string;
    shen_gong: string;
    special_patterns: string[];
    raw_data: {
        five_elements?: {
            percentages: Record<string, number>;
            strongest: string;
        };
    };
}

const PillarCard = ({ data, label }: { data: PillarData; label: string }) => (
    <div className="flex flex-col items-center p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50"></div>
        <span className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-3 font-bold">{label}</span>

        {/* Gan/Zhi */}
        <div className="flex flex-col items-center space-y-2 mb-4">
            <div className="relative">
                <span className="text-4xl font-serif text-primary font-bold">{data.gan}</span>
                <span className="absolute -top-2 -right-6 text-[10px] text-subtext-light dark:text-subtext-dark bg-background-light dark:bg-background-dark px-1 rounded border border-border-light dark:border-border-dark">{data.gan_god}</span>
            </div>
            <span className="text-4xl font-serif text-text-light dark:text-text-dark font-bold">{data.zhi}</span>
        </div>

        {/* Hidden Stems & Gods */}
        <div className="w-full space-y-1 mb-3">
            {data.hidden_stems.map((stem, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                    <span className="text-text-light dark:text-text-dark">{stem}</span>
                    <span className="text-subtext-light dark:text-subtext-dark scale-90">{data.zhi_gods[idx]}</span>
                </div>
            ))}
        </div>

        {/* Na Yin & Xing Yun */}
        <div className="w-full pt-2 border-t border-border-light dark:border-border-dark flex justify-between text-xs text-subtext-light dark:text-subtext-dark mb-2">
            <span>{data.nayin}</span>
            <span>{data.xingyun}</span>
        </div>

        {/* Shen Sha */}
        <div className="w-full space-y-1">
            {data.shen_sha.map((star, idx) => (
                <span key={idx} className="block text-[10px] text-center bg-primary/10 text-primary px-1 py-0.5 rounded">
                    {star}
                </span>
            ))}
        </div>
    </div>
);

const FiveElementBar = ({ label, percent, color }: { label: string; percent: number; color: string }) => (
    <div className="flex items-center space-x-3 mb-2">
        <span className="w-12 text-sm font-bold text-text-light dark:text-text-dark">{label}</span>
        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${percent}%` }}
            ></div>
        </div>
        <span className="w-12 text-sm text-right text-subtext-light dark:text-subtext-dark">{percent}%</span>
    </div>
);

export default function BaziChart({ data }: { data: ChartData }) {
    const fiveElements = data.raw_data.five_elements?.percentages || { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 p-4">

            {/* Header */}
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-serif text-primary font-bold">命盘详解</h2>
                <p className="text-subtext-light dark:text-subtext-dark">
                    {data.name} • {data.gender === 'male' ? '乾造' : '坤造'} • {data.lunar_date}
                </p>
            </div>

            {/* Four Pillars */}
            <div className="grid grid-cols-4 gap-3 md:gap-6">
                <PillarCard data={data.year_pillar} label="年柱" />
                <PillarCard data={data.month_pillar} label="月柱" />
                <PillarCard data={data.day_pillar} label="日柱" />
                <PillarCard data={data.hour_pillar} label="时柱" />
            </div>

            {/* Tai/Ming/Shen & Day Master */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Day Master Info */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                    <h3 className="text-lg font-bold text-primary mb-4 border-b border-border-light dark:border-border-dark pb-2">日元本命</h3>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <span className="text-6xl font-serif text-primary block mb-2">{data.day_master}</span>
                            <span className="text-sm text-subtext-light dark:text-subtext-dark">日主</span>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-text-light dark:text-text-dark font-medium">
                                五行: {getElement(data.day_master)}
                            </p>
                            <p className="text-text-light dark:text-text-dark font-medium">
                                旺衰: <span className={data.day_master_strength === 'Strong' ? 'text-green-500' : 'text-red-500'}>{data.day_master_strength === 'Strong' ? '身强' : '身弱'}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Three Special Pillars */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg md:col-span-2">
                    <h3 className="text-lg font-bold text-primary mb-4 border-b border-border-light dark:border-border-dark pb-2">胎命身三柱</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">胎元</p>
                            <p className="text-xl font-serif text-text-light dark:text-text-dark font-bold">{data.tai_yuan || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">命宫</p>
                            <p className="text-xl font-serif text-text-light dark:text-text-dark font-bold">{data.ming_gong || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">身宫</p>
                            <p className="text-xl font-serif text-text-light dark:text-text-dark font-bold">{data.shen_gong || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Five Elements */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                    <h3 className="text-lg font-bold text-primary mb-4 border-b border-border-light dark:border-border-dark pb-2">五行旺衰</h3>
                    <div className="space-y-3">
                        <FiveElementBar label="木" percent={fiveElements.Wood} color="bg-green-500" />
                        <FiveElementBar label="火" percent={fiveElements.Fire} color="bg-red-500" />
                        <FiveElementBar label="土" percent={fiveElements.Earth} color="bg-yellow-600" />
                        <FiveElementBar label="金" percent={fiveElements.Metal} color="bg-gray-400" />
                        <FiveElementBar label="水" percent={fiveElements.Water} color="bg-blue-500" />
                    </div>
                </div>

                {/* Special Patterns & Interactions */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                    <h3 className="text-lg font-bold text-primary mb-4 border-b border-border-light dark:border-border-dark pb-2">刑冲合害</h3>
                    {data.special_patterns.length > 0 ? (
                        <ul className="space-y-2">
                            {data.special_patterns.map((pattern, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-sm text-text-light dark:text-text-dark">
                                    <span className="w-2 h-2 bg-brand-red rounded-full"></span>
                                    <span>{pattern}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-subtext-light dark:text-subtext-dark text-sm">命局平稳，无明显刑冲。</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function getElement(gan: string): string {
    const map: Record<string, string> = {
        "甲": "阳木", "乙": "阴木",
        "丙": "阳火", "丁": "阴火",
        "戊": "阳土", "己": "阴土",
        "庚": "阳金", "辛": "阴金",
        "壬": "阳水", "癸": "阴水"
    };
    return map[gan] || "未知";
}
