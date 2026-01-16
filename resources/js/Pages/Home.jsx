import { Head, Link } from '@inertiajs/react';
import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

// Helper function to strip HTML tags for preview
const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export default function Home({ auth, products }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleShare = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        const url = route('products.show', product.slug);

        if (navigator.share) {
            navigator.share({
                title: product.title,
                url: url
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopiedId(product.id);
                setTimeout(() => setCopiedId(null), 2000);
            });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Head title="SW BuyKro | Simple Product Reviews" />

            <nav className="nav-standard">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/logo.png" className="w-10 h-10 object-contain" alt="SW Logo" />
                        <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">BuyKro</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
                <div className="mb-12">
                    <h1 className="text-3xl font-black mb-2">Expert Selections</h1>
                    <p className="text-[var(--text-muted)] text-lg">Curated products for the modern workspace.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="product-card group relative">
                            <Link href={route('products.show', product.slug)} className="block aspect-square overflow-hidden rounded-xl mb-6 bg-slate-100 relative">
                                <img
                                    src={product.image_url}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    alt={product.title}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image'; }}
                                />
                                <button
                                    onClick={(e) => handleShare(e, product)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-indigo-600 transition-all z-10"
                                    title="Share product"
                                >
                                    {copiedId === product.id ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                                </button>
                            </Link>
                            <span className="category-tag">{product.category}</span>
                            <h2 className="product-title">{product.title}</h2>
                            <p className="product-desc">{stripHtml(product.description)}</p>

                            <div className="mt-auto flex flex-col gap-3">
                                <Link
                                    href={route('products.show', product.slug)}
                                    className="btn-details text-center"
                                >
                                    View Details
                                </Link>
                                {product.affiliate_links && product.affiliate_links.length > 0 ? (
                                    <a
                                        href={product.affiliate_links[0].url}
                                        target="_blank"
                                        rel="sponsored nofollow"
                                        className="btn-buy text-center"
                                    >
                                        {product.affiliate_links.length > 1 ? 'View Deals' : 'Purchase Item'}
                                    </a>
                                ) : (
                                    <button disabled className="btn-buy opacity-50 cursor-not-allowed text-center">
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="footer-standard">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <span className="text-sm font-bold">© 2026 SW BuyKro</span>
                    <div className="flex gap-8 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
