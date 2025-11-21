"use client";

import Link from "next/link";

export default function BlogSidebar() {
    return (
        <aside className="w-full lg:w-80 space-y-8">
            {/* Free Chart CTA */}
            <div className="p-6 bg-gradient-to-br from-mystic-900 to-purple-900 rounded-xl border border-gold-400/30 shadow-xl sticky top-24">
                <h3 className="text-xl font-serif text-gold-400 mb-2">Know Your Destiny?</h3>
                <p className="text-sm text-gray-300 mb-4">
                    Unlock the secrets of your Bazi chart. Discover your hidden potential and future path.
                </p>
                <Link
                    href="/"
                    className="block w-full py-3 text-center bg-gold-400 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                    Free Calculation
                </Link>
            </div>

            {/* Popular Posts */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-lg font-serif text-white mb-4">Popular Readings</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li>
                        <Link href="/blog/2026-fire-horse-year" className="hover:text-gold-400 transition-colors">
                            2026: The Year of the Fire Horse
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog/wealth-element-guide" className="hover:text-gold-400 transition-colors">
                            Finding Your Wealth Element
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog/love-compatibility-bazi" className="hover:text-gold-400 transition-colors">
                            Love & Compatibility in Bazi
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
