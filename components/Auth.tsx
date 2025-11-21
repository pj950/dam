"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            alert(error.message);
        } else {
            alert('Check your email for the login link!');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-serif text-white mb-4">Sign In / Sign Up</h3>
            <p className="text-gray-400 mb-6 text-sm">Enter your email to receive a magic link.</p>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
            </form>
        </div>
    );
}
