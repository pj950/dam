"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    return (
        <header className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm sticky top-0 z-40">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                        <path d="M12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c1.313 0 2.553-.32 3.658-.877A6.01 6.01 0 0 1 12 18a6 6 0 0 1 0-12 5.984 5.984 0 0 1 3.658 1.123A7.962 7.962 0 0 0 12 4z"></path>
                    </svg>
                    <span className="text-xl font-bold text-text-light dark:text-text-dark">玄机阁</span>
                </div>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-subtext-light dark:text-subtext-dark">
                    <Link href="/" className="hover:text-primary transition-colors">探玄</Link>
                    <Link href="/daily" className="hover:text-primary transition-colors">每日一签</Link>
                    <Link href="/rituals" className="hover:text-primary transition-colors">祈福点灯</Link>
                    <Link href="/pricing" className="hover:text-primary transition-colors">定价</Link>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-text-light dark:text-text-dark hidden md:inline">
                                {user.email}
                            </span>
                            <button
                                onClick={() => signOut()}
                                className="text-sm text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors"
                            >
                                退出
                            </button>
                            <Link href="/dashboard" className="bg-primary/10 text-primary font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary/20 transition-colors">
                                个人中心
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-bold text-text-light dark:text-text-dark hover:text-primary transition-colors">
                            登录
                        </Link>
                    )}

                    <Link href="/" className="bg-primary text-gray-900 font-bold py-2 px-5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                        免费测算
                    </Link>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="material-icons-outlined">menu</span>
                    </button>
                </div>
            </nav>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </header>
    );
}
