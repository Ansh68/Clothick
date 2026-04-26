import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Sparkles, Loader2 } from 'lucide-react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

export default function NewArrivals() {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', 'new-arrivals'],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products?tag=new`
            );
            return data;
        },
    });

    return (
        <div className="bg-white min-h-screen">
            <Container className="py-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        New Arrivals
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        Elevate Your Digital Lifestyle
                    </h1>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Discover our latest collection of premium clothing, freshly added and ready to elevate your wardrobe.
                    </p>
                </div>

                {/* Products */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            No new arrivals yet
                        </h2>
                        <p className="text-gray-500">
                            Check back soon! We're constantly adding new products.
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
