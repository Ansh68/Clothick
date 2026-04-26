import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import ShopSidebar from '../components/ShopSidebar';
import { Loader2, SlidersHorizontal, X } from 'lucide-react';

const sortOptions = [
    { label: 'Name: A to Z', value: 'name_asc' },
    { label: 'Name: Z to A', value: 'name_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
];

export default function Men() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedGender, setSelectedGender] = useState('men');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [sortBy, setSortBy] = useState('name_asc');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const queryUrl = useMemo(() => {
        let url = `${import.meta.env.VITE_API_URL}/api/products?gender=men&`;
        if (selectedVariant) url += `variant=${selectedVariant}&`;
        if (selectedStatus) url += `status=${selectedStatus}&`;
        if (sortBy) url += `sort=${sortBy}&`;
        return url;
    }, [selectedVariant, selectedStatus, sortBy]);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', 'men', queryUrl],
        queryFn: async () => {
            const { data } = await axios.get(queryUrl);
            return data;
        },
    });

    const filteredProducts = useMemo(() => {
        if (!selectedPriceRange) return products;
        const [min, max] = selectedPriceRange.split('-').map(Number);
        return products.filter((p) => (p.price ?? 0) >= min && (p.price ?? 0) <= max);
    }, [products, selectedPriceRange]);

    const getFilterLabel = () => {
        if (selectedStatus) return selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
        if (selectedVariant) return selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1);
        return "Men's Collection";
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-white border-b border-gray-100">
                <Container className="py-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Men's Collection</h1>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
                        Explore our curated collection of premium men's clothing. From casual to formal, find your perfect style.
                    </p>
                </Container>
            </div>

            <Container className="py-8">
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-black transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className="flex gap-8">
                    <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                        <ShopSidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                            selectedGender={selectedGender}
                            setSelectedGender={setSelectedGender}
                            selectedPriceRange={selectedPriceRange}
                            setSelectedPriceRange={setSelectedPriceRange}
                            selectedStatus={selectedStatus}
                            setSelectedStatus={setSelectedStatus}
                            hideGenderFilter
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-black">{filteredProducts.length > 0 ? 1 : 0}</span>
                                {' - '}<span className="font-semibold text-black">{filteredProducts.length}</span>
                                {' of '}<span className="font-semibold text-black">{filteredProducts.length}</span>
                                {' products for '}<span className="font-semibold text-black">{getFilterLabel()}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-black cursor-pointer min-w-[170px]"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {(selectedVariant || selectedPriceRange || selectedStatus) && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedVariant && (
                                    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                        Collection: {selectedVariant}
                                        <button onClick={() => setSelectedVariant('')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedStatus && (
                                    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                        Status: {selectedStatus}
                                        <button onClick={() => setSelectedStatus('')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedPriceRange && (
                                    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                        Price: ₹{selectedPriceRange.replace('-', ' - ₹')}
                                        <button onClick={() => setSelectedPriceRange('')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                <button onClick={() => { setSelectedCategory('all'); setSelectedVariant(''); setSelectedStatus(''); setSelectedPriceRange(''); }}
                                    className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1.5"
                                >Clear all</button>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
