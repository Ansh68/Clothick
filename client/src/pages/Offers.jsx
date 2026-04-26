import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TrendingUp, Loader2 } from 'lucide-react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

export default function Offers() {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', 'offers'],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products?tag=sale`
            );
            return data;
        },
    });

    return (
        <div className="bg-white min-h-screen">
            <Container className="py-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold uppercase tracking-wider mb-4">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Seasonal Sale
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        Premium Deals, Unbeatable Prices
                    </h1>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Experience luxury for less. Explore our exclusive collection of high-demand items with seasonal discounts designed for the discerning shopper.
                    </p>
                </div>

                {/* Products */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            No offers available right now
                        </h2>
                        <p className="text-gray-500">
                            Check back soon! Exciting deals are on the way.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
