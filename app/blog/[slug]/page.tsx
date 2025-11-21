import BlogSidebar from "@/components/BlogSidebar";
import Link from "next/link";

// Mock Data for MVP
const POSTS = {
    "2026-fire-horse-year": {
        title: "2026: Preparing for the Year of the Fire Horse",
        date: "Nov 20, 2025",
        content: `
      <p class="mb-4">The Fire Horse year (Bing Wu) is known for its intense energy, rapid changes, and volatile markets. Historically, Fire Horse years have been turning points for global economies and personal fortunes.</p>
      <h3 class="text-2xl font-serif text-gold-400 mt-8 mb-4">What to Expect</h3>
      <p class="mb-4">Fire represents passion, technology, and spirituality. Horse represents speed, travel, and competition. Combined, 2026 will be a year where hesitation leads to loss, and bold action leads to either massive success or burnout.</p>
      <h3 class="text-2xl font-serif text-gold-400 mt-8 mb-4">Strategic Advice</h3>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Career:</strong> Pivot quickly. Traditional stable jobs may face disruption.</li>
        <li><strong>Wealth:</strong> Invest in tech and energy sectors. Avoid long-term bonds.</li>
        <li><strong>Health:</strong> Watch out for heart and eye issues (Fire element).</li>
      </ul>
      <p>To navigate this turbulent year, understanding your personal Bazi chart is crucial. Is Fire your favorable element? Or does it clash with your Day Master?</p>
    `
    },
    "wealth-element-guide": {
        title: "How to Find Your Wealth Element",
        date: "Oct 15, 2025",
        content: `
      <p class="mb-4">In Bazi, your Wealth element is the element that your Day Master controls. For example, if you are a Wood Day Master, Earth is your Wealth element.</p>
      <p class="mb-4">However, "seeing" wealth in your chart doesn't guarantee riches. You need a strong Day Master to "carry" the wealth. If you are weak, excessive wealth element can actually lead to financial stress.</p>
    `
    }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = POSTS[params.slug as keyof typeof POSTS];

    if (!post) {
        return (
            <main className="min-h-screen bg-space-900 py-24 px-4 text-center">
                <h1 className="text-4xl font-serif text-white mb-4">404</h1>
                <p className="text-gray-400">The ancient scrolls do not contain this record.</p>
                <Link href="/" className="text-gold-400 hover:underline mt-4 inline-block">Return Home</Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-space-900 py-24 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <article className="flex-1">
                    <header className="mb-8">
                        <Link href="/blog" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">&larr; Back to Blog</Link>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-gray-400">{post.date} • By Master AI</p>
                    </header>

                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-gold-400"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* In-Article CTA */}
                    <div className="my-12 p-8 bg-white/5 rounded-2xl border border-gold-400/20 text-center">
                        <h3 className="text-2xl font-serif text-white mb-2">Confused by the Elements?</h3>
                        <p className="text-gray-400 mb-6">Get your personalized 2026 strategy report today.</p>
                        <Link href="/" className="px-8 py-3 bg-gold-400 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors">
                            Analyze My Chart
                        </Link>
                    </div>
                </article>

                {/* Sidebar */}
                <BlogSidebar />
            </div>
        </main>
    );
}
