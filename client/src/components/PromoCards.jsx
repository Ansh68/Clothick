import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

export default function PromoCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {/* Left Card - New Arrivals (Dark) */}
            <Link
                to="/new-arrivals"
                className="group relative flex rounded-2xl overflow-hidden h-[280px] md:h-[300px] bg-[#f0eeeb] cursor-pointer"
            >
                {/* Text Content */}
                <div className="flex flex-col justify-center p-7 md:p-10 z-10 flex-1">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 leading-tight italic" style={{ fontFamily: 'Georgia, serif' }}>
                        New Arrival
                    </h2>
                    <p className="text-sm text-teal-600 mt-2 tracking-wider">
                        2026 Autumn & Winter
                    </p>
                </div>

                {/* Image */}
                <div className="absolute right-0 top-0 bottom-0 w-3/5 flex items-center justify-center">
                    <img
                        src="/images/new-arrivals.png"
                        alt="New Arrivals"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f0eeeb] via-[#f0eeeb]/20 to-transparent" />
                </div>
            </Link>

            {/* Right Card - Summer Collection (Light) */}
            <Link
                to="/offers"
                className="group relative flex rounded-2xl overflow-hidden h-[280px] md:h-[300px] bg-gray-50 border border-gray-200 cursor-pointer"
            >
                {/* Text Content */}
                <div className="flex flex-col justify-between p-7 md:p-8 z-10 flex-1">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold uppercase tracking-wider mb-5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Limited Time
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                            Flat 30% Off
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">On select summer styles</p>
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold group-hover:bg-gray-900 transition-colors">
                            Grab the Deal
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>

                {/* Image */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center">
                    <img
                        src="/images/seasonal-sale.png"
                        alt="Summer Collection"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay for smooth blend */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/30 to-transparent" />
                </div>
            </Link>
        </div>
    );
}
