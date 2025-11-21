import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Mystic Insights | Cyber Metaphysics",
    description: "AI-powered Bazi and Eastern Astrology Insights",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-space-900 text-white min-h-screen`}>
                <AuthProvider>
                    {children}
                    <Toaster position="top-center" toastOptions={{
                        style: {
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid #333',
                        },
                    }} />
                </AuthProvider>
            </body>
        </html>
    );
}
