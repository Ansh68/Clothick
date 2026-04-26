import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import PriceView from '../components/PriceView';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const addItem = useCartStore((s) => s.addItem);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (!user) {
            navigate('/signin');
            toast.error('Please sign in to add to cart');
            return;
        }
        addItem(product);
        toast.success('Added to cart');
    };

    const handleRemove = (productId) => {
        removeItem(productId);
        toast.success('Removed from wishlist');
    };

    const handleClearWishlist = () => {
        if (window.confirm('Are you sure you want to clear your wishlist?')) {
            clearWishlist();
            toast.success('Wishlist cleared');
        }
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <Container>
                {/* Header Section */}
                <div className="flex items-start justify-between py-8 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            My Wishlist
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base max-w-lg">
                            Keep track of the products you love. Your personal collection of premium finds,
                            ready for when you're prepared to shop.
                        </p>
                    </div>
                    {items.length > 0 && (
                        <button
                            onClick={handleClearWishlist}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium shrink-0"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear Wishlist
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-6 max-w-sm">
                            Explore our collection and add your favorite items to your wishlist.
                        </p>
                        <Link
                            to="/shop"
                            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                        {items.map((product) => (
                            <div
                                key={product._id}
                                className="group rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200">
                                    {product?.discount > 0 && (
                                        <span className="absolute top-3 right-3 bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded z-10">
                                            {product.discount}% OFF
                                        </span>
                                    )}
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="absolute top-3 left-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100"
                                        title="Remove from wishlist"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <Link to={`/product/${product?.slug}`}>
                                        {product?.images?.[0] && (
                                            <img
                                                src={product.images[0]}
                                                alt={product?.name}
                                                className="w-full h-72 object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </Link>
                                </div>

                                {/* Info Section */}
                                <div className="p-4 flex flex-col gap-2 bg-zinc-50">
                                    <Link to={`/product/${product?.slug}`}>
                                        <h3 className="text-base font-semibold line-clamp-1 hover:text-gray-600 transition-colors">
                                            {product?.name}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm truncate">{product?.intro}</p>
                                    <PriceView
                                        price={product?.price}
                                        discount={product?.discount}
                                        className="text-lg"
                                    />
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-darkColor/30 text-darkColor hover:bg-darkColor hover:text-white transition-all duration-300 text-sm font-medium"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
