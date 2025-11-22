import DailyDraw from "@/components/DailyDraw";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DailyPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
            <Header />
            <main className="flex-grow py-20">
                <DailyDraw />
            </main>
            <Footer />
        </div>
    );
}
