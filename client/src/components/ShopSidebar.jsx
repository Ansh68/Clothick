import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { productType } from '../constants';

const statusFilters = [
    { title: 'All Products', value: '' },
    { title: 'New', value: 'new' },
    { title: 'Hot', value: 'hot' },
    { title: 'Sale', value: 'sale' },
];

const genderFilters = [
    { title: 'All', value: '' },
    { title: 'Men', value: 'men' },
    { title: 'Women', value: 'women' },
    { title: 'Unisex', value: 'unisex' },
];

const priceRanges = [
    { title: 'All Prices', value: '' },
    { title: 'Under ₹500', value: '0-500' },
    { title: '₹500 - ₹1000', value: '500-1000' },
    { title: '₹1000 - ₹2000', value: '1000-2000' },
    { title: '₹2000 - ₹5000', value: '2000-5000' },
    { title: 'Over ₹5000', value: '5000-99999' },
];

function FilterAccordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-3.5 text-left group"
            >
                <span className="font-semibold text-sm text-gray-800 group-hover:text-black transition-colors">
                    {title}
                </span>
                {open ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
            </button>
            {open && (
                <div className="pb-3.5 animate-fadeIn">{children}</div>
            )}
        </div>
    );
}

export default function ShopSidebar({
    selectedCategory,
    setSelectedCategory,
    selectedVariant,
    setSelectedVariant,
    selectedGender,
    setSelectedGender,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedStatus,
    setSelectedStatus,
    hideGenderFilter = false,
}) {
    return (
        <aside className="w-full lg:w-56 shrink-0">
            {/* Categories Section */}
            <div className="border border-gray-200 rounded-lg p-5 mb-4">
                <h3 className="font-bold text-base text-gray-900 mb-4">Categories</h3>
                <div className="flex flex-col gap-0.5">
                    <button
                        onClick={() => {
                            setSelectedCategory('all');
                            setSelectedVariant('');
                            setSelectedStatus('');
                        }}
                        className={`text-left px-3 py-2 rounded-md text-sm transition-all ${selectedCategory === 'all'
                            ? 'bg-black text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                            }`}
                    >
                        All Products
                    </button>
                    {statusFilters.slice(1).map((s) => (
                        <button
                            key={s.value}
                            onClick={() => {
                                setSelectedCategory(s.value);
                                setSelectedStatus(s.value);
                                setSelectedVariant('');
                            }}
                            className={`text-left px-3 py-2 rounded-md text-sm transition-all capitalize ${selectedCategory === s.value
                                ? 'bg-black text-white font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                }`}
                        >
                            {s.title}
                        </button>
                    ))}
                    {productType.map((p) => (
                        <button
                            key={p.value}
                            onClick={() => {
                                setSelectedCategory(p.value);
                                setSelectedVariant(p.value);
                                setSelectedStatus('');
                            }}
                            className={`text-left px-3 py-2 rounded-md text-sm transition-all ${selectedCategory === p.value
                                ? 'bg-black text-white font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                }`}
                        >
                            {p.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Section */}
            <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-gray-200">
                    <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                    <h3 className="font-bold text-base text-gray-900">Filter</h3>
                </div>

                {/* Gender Filter - hidden on gender-specific pages */}
                {!hideGenderFilter && (
                    <FilterAccordion title="Gender" defaultOpen={false}>
                        <div className="flex flex-col gap-1">
                            {genderFilters.map((g) => (
                                <button
                                    key={g.value}
                                    onClick={() => setSelectedGender(g.value)}
                                    className={`text-left px-3 py-1.5 rounded text-sm transition-all ${selectedGender === g.value
                                        ? 'text-black font-semibold bg-gray-100'
                                        : 'text-gray-500 hover:text-black'
                                        }`}
                                >
                                    {g.title}
                                </button>
                            ))}
                        </div>
                    </FilterAccordion>
                )}

                {/* Variant Filter */}
                <FilterAccordion title="Collection" defaultOpen={false}>
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setSelectedVariant('')}
                            className={`text-left px-3 py-1.5 rounded text-sm transition-all ${selectedVariant === ''
                                ? 'text-black font-semibold bg-gray-100'
                                : 'text-gray-500 hover:text-black'
                                }`}
                        >
                            All
                        </button>
                        {productType.map((p) => (
                            <button
                                key={p.value}
                                onClick={() => setSelectedVariant(p.value)}
                                className={`text-left px-3 py-1.5 rounded text-sm transition-all ${selectedVariant === p.value
                                    ? 'text-black font-semibold bg-gray-100'
                                    : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {p.title}
                            </button>
                        ))}
                    </div>
                </FilterAccordion>

                {/* Price Range Filter */}
                <FilterAccordion title="Price Range" defaultOpen={false}>
                    <div className="flex flex-col gap-1">
                        {priceRanges.map((p) => (
                            <button
                                key={p.value}
                                onClick={() => setSelectedPriceRange(p.value)}
                                className={`text-left px-3 py-1.5 rounded text-sm transition-all ${selectedPriceRange === p.value
                                    ? 'text-black font-semibold bg-gray-100'
                                    : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {p.title}
                            </button>
                        ))}
                    </div>
                </FilterAccordion>

                {/* Status Filter */}
                <FilterAccordion title="Status" defaultOpen={false}>
                    <div className="flex flex-col gap-1">
                        {statusFilters.map((s) => (
                            <button
                                key={s.value}
                                onClick={() => setSelectedStatus(s.value)}
                                className={`text-left px-3 py-1.5 rounded text-sm transition-all ${selectedStatus === s.value
                                    ? 'text-black font-semibold bg-gray-100'
                                    : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </FilterAccordion>
            </div>
        </aside>
    );
}
