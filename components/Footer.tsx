import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3">
                            <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                <path d="M12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c1.313 0 2.553-.32 3.658-.877A6.01 6.01 0 0 1 12 18a6 6 0 0 1 0-12 5.984 5.984 0 0 1 3.658 1.123A7.962 7.962 0 0 0 12 4z"></path>
                            </svg>
                            <span className="text-xl font-bold text-text-light dark:text-text-dark">玄机阁</span>
                        </div>
                        <p className="mt-4 text-sm text-subtext-light dark:text-subtext-dark max-w-sm">
                            融合千年易经智慧与AI技术，我们为您提供专业、深刻、值得信赖的命理分析，照亮您的人生道路。
                        </p>
                        <div className="mt-6 flex space-x-4 text-subtext-light dark:text-subtext-dark">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="hover:text-primary transition-colors">WeChat</a>
                            <a href="#" className="hover:text-primary transition-colors">Weibo</a>
                            <a href="#" className="hover:text-primary transition-colors">Douyin</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-light dark:text-text-dark tracking-wider uppercase">产品</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/" className="text-subtext-light dark:text-subtext-dark hover:text-primary">人生轨迹分析</Link></li>
                            <li><Link href="/" className="text-subtext-light dark:text-subtext-dark hover:text-primary">AI解读</Link></li>
                            <li><Link href="/dashboard" className="text-subtext-light dark:text-subtext-dark hover:text-primary">历史报告</Link></li>
                            <li><Link href="/daily" className="text-subtext-light dark:text-subtext-dark hover:text-primary">命理工具</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-light dark:text-text-dark tracking-wider uppercase">公司</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/about" className="text-subtext-light dark:text-subtext-dark hover:text-primary">关于我们</Link></li>
                            <li><Link href="/contact" className="text-subtext-light dark:text-subtext-dark hover:text-primary">联系方式</Link></li>
                            <li><Link href="/privacy" className="text-subtext-light dark:text-subtext-dark hover:text-primary">隐私政策</Link></li>
                            <li><Link href="/terms" className="text-subtext-light dark:text-subtext-dark hover:text-primary">服务条款</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border-light dark:border-border-dark pt-8 text-center text-sm text-subtext-light dark:text-subtext-dark">
                    <p>© 2024 玄机阁. 版权所有.</p>
                </div>
            </div>
        </footer>
    );
}
