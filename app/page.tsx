import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark transition-colors duration-300">
            <div className="background-pattern">
                <Header />
                <main>
                    <HeroSection />

                    {/* Features Section */}
                    <section className="py-20 md:py-24 bg-surface-light dark:bg-surface-dark">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">为何选择我们？</h2>
                            <p className="mt-3 text-lg text-subtext-light dark:text-subtext-dark">专业、深刻、值得信赖的命理服务</p>
                            <div className="mt-12 grid md:grid-cols-3 gap-8">
                                {/* Feature 1 */}
                                <div className="relative p-8 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="mb-4 text-primary text-5xl font-mono">☰</div>
                                        <h3 className="font-semibold text-lg mb-2 text-text-dark">正统玄学</h3>
                                        <p className="text-subtext-light dark:text-subtext-dark">基于正统易经命理，提供精准个性化解读。</p>
                                    </div>
                                </div>
                                {/* Feature 2 */}
                                <div className="relative p-8 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="mb-4 text-primary text-5xl font-mono">☷</div>
                                        <h3 className="font-semibold text-lg mb-2 text-text-dark">AI赋能</h3>
                                        <p className="text-subtext-light dark:text-subtext-dark">前沿AI技术深度剖析，洞察您的人生轨迹。</p>
                                    </div>
                                </div>
                                {/* Feature 3 */}
                                <div className="relative p-8 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="mb-4 text-primary text-5xl font-mono">☲</div>
                                        <h3 className="font-semibold text-lg mb-2 text-text-dark">隐私安全</h3>
                                        <p className="text-subtext-light dark:text-subtext-dark">严格加密保护个人信息，安全可靠。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section className="py-20 md:py-24 bg-background-light dark:bg-background-dark">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">我们的服务</h2>
                            <p className="mt-3 text-lg text-subtext-light dark:text-subtext-dark">多维度解析，助您洞察自我。</p>
                            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                                {/* Service 1 */}
                                <div className="relative p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg text-center">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10">
                                        <div className="mx-auto mb-4 text-primary text-4xl">命</div>
                                        <h3 className="font-semibold text-md mb-2 text-text-dark">八字精批</h3>
                                        <p className="text-sm text-subtext-light dark:text-subtext-dark">详尽的生辰八字计算与分析。</p>
                                    </div>
                                </div>
                                {/* Service 2 */}
                                <div className="relative p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg text-center">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10">
                                        <div className="mx-auto mb-4 text-primary text-4xl">运</div>
                                        <h3 className="font-semibold text-md mb-2 text-text-dark">人生轨迹</h3>
                                        <p className="text-sm text-subtext-light dark:text-subtext-dark">深度人生轨迹分析，助您自我发现。</p>
                                    </div>
                                </div>
                                {/* Service 3 */}
                                <div className="relative p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg text-center">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10">
                                        <div className="mx-auto mb-4 text-primary text-4xl">决</div>
                                        <h3 className="font-semibold text-md mb-2 text-text-dark">决策指南</h3>
                                        <p className="text-sm text-subtext-light dark:text-subtext-dark">关键人生决策与机遇的指导。</p>
                                    </div>
                                </div>
                                {/* Service 4 */}
                                <div className="relative p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg text-center">
                                    <div className="card-glow gradient-glow"></div>
                                    <div className="relative z-10">
                                        <div className="mx-auto mb-4 text-primary text-4xl">缘</div>
                                        <h3 className="font-semibold text-md mb-2 text-text-dark">合婚配对</h3>
                                        <p className="text-sm text-subtext-light dark:text-subtext-dark">理解人际关系动态与相容性。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20">
                        <div className="container mx-auto px-6 text-center">
                            <p className="text-lg text-subtext-light dark:text-subtext-dark">免费试算，深度报告，一站式服务</p>
                            <div className="mt-8 flex justify-center items-center space-x-4">
                                <button className="bg-primary text-gray-900 font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                                    免费试算
                                </button>
                                <button className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary/10 transition-colors">
                                    查看定价
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
