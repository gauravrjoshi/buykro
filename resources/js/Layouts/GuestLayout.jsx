import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-mesh pt-6 sm:justify-center sm:pt-0">
            <div className="glow-point top-[-100px] left-[-100px] bg-indigo-600"></div>
            <div className="glow-point bottom-[-100px] right-[-100px] bg-pink-600"></div>

            <div className="relative z-10">
                <Link href="/" className="flex flex-col items-center gap-4 mb-8">
                    <img src="/images/logo.png" alt="SW Afflio" className="w-20 h-20 object-contain shadow-2xl rounded-[32px] bg-white/5 p-2 backdrop-blur-xl border border-white/10" />
                    <span className="text-2xl font-black tracking-tighter text-white">
                        SW<span className="text-indigo-500">AFFLIO</span>
                    </span>
                </Link>
            </div>

            <div className="relative z-10 mt-6 w-full overflow-hidden glass px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-[32px] border-white/5">
                {children}
            </div>
        </div>
    );
}
