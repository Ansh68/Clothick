import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RotateCcw } from 'lucide-react';
import { fetchProductsByVariant } from '../api/products';
import { productType } from '../constants';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || 'Tshirt');
  const variant = productType.find((p) => p.title === selectedTab)?.value || 'tshirt';

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'variant', variant],
    queryFn: () => fetchProductsByVariant(variant),
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
        {productType.map((p) => (
          <button
            key={p.value}
            onClick={() => setSelectedTab(p.title)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm border ${selectedTab === p.title
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-300 hover:border-black'
              }`}
          >
            {p.title}
          </button>
        ))}
        <button
          onClick={() => setSelectedTab(productType[0].title)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-black transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-black" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span>Loading products...</span>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">No products in this category yet.</div>
      )}
    </div>
  );
}
