import Link from "next/link";

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-space-900 py-24 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-gold-400 mb-6">
                    The Mystic Archive
                </h1>
                <p className="text-xl text-gray-400">
                    Ancient wisdom for the modern cyber-age.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid gap-8">
                <Link href="/blog/2026-fire-horse-year" className="group block p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-gold-400/50 transition-all hover:bg-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-serif text-white group-hover:text-gold-400 transition-colors mb-2">
                                2026: Preparing for the Year of the Fire Horse
                            </h2>
                            <p className="text-gray-400 line-clamp-2">
                                The Fire Horse year is known for its intense energy and rapid changes. Discover how to navigate the coming turbulence.
                            </p>
                        </div>
                        <span className="text-sm text-purple-400 whitespace-nowrap">Read Article &rarr;</span>
                    </div>
                </Link>

                <Link href="/blog/wealth-element-guide" className="group block p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-gold-400/50 transition-all hover:bg-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-serif text-white group-hover:text-gold-400 transition-colors mb-2">
                                How to Find Your Wealth Element
                            </h2>
                            <p className="text-gray-400 line-clamp-2">
                                Is it Earth? Water? Fire? Learn the secrets of the Ten Gods and how to activate your wealth luck.
                            </p>
                        </div>
                        <span className="text-sm text-purple-400 whitespace-nowrap">Read Article &rarr;</span>
                    </div>
                </Link>
            </div>
        </main>
    );
}
