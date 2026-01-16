import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail({ auth, product }) {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: product.title,
                url: url
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Head>
                <title>{`${product?.title} | SW BuyKro Details`}</title>
                <meta name="description" content={product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
                <meta property="og:image" content={product.image_url} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="product" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.title} />
                <meta name="twitter:description" content={product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
                <meta name="twitter:image" content={product.image_url} />
            </Head>

            <nav className="nav-standard">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:text-indigo-700 transition">
                            <ArrowLeft size={18} />
                            <span className="text-sm">Back to Home</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200" />
                        <img src="/images/logo.png" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition" alt="SW Logo" />
                    </Link>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                        {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                        <span>{copied ? 'Copied Link' : 'Share'}</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="aspect-square rounded-[32px] overflow-hidden bg-slate-100 shadow-2xl">
                        <img
                            src={product.image_url}
                            className="w-full h-full object-cover"
                            alt={product.title}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x800?text=Product+Image'; }}
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="category-tag !text-sm !px-4 !py-2 !mb-6">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
                            {product.title}
                        </h1>

                        <div className="h-px bg-[var(--border)] w-full mb-8" />

                        <div className="prose prose-slate prose-lg max-w-none mb-10">
                            <div
                                className="text-[var(--text-main)] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div className="mt-auto space-y-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Available Vendors</h3>
                            <div className="grid gap-3">
                                {product.affiliate_links && product.affiliate_links.length > 0 ? (
                                    product.affiliate_links.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="sponsored nofollow"
                                            className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Best Price at</span>
                                                <span className="text-base font-black text-slate-900">{link.vendor_name}</span>
                                            </div>
                                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                <ExternalLink size={16} />
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div className="p-8 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-center">
                                        <p className="text-slate-500 font-medium">No purchase links available yet.</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-center text-[10px] font-bold text-[var(--text-muted)] mt-6 uppercase tracking-widest">
                                Secure external checkout via verified merchant.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
