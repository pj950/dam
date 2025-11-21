import AIChat from "@/components/AIChat";

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-space-900 py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-serif text-gold-400 mb-8 text-center">Master's Sanctum (VIP)</h1>
                <AIChat />
            </div>
        </main>
    );
}
