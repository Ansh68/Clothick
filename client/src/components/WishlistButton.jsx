import { Heart } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function WishlistButton({ product, className = '', size = 'w-5 h-5' }) {
    const toggleItem = useWishlistStore((s) => s.toggleItem);
    const isInWishlist = useWishlistStore((s) => s.items.some((i) => i._id === product?._id));

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
        if (isInWishlist) {
            toast.success('Removed from wishlist');
        } else {
            toast.success('Added to wishlist');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart
                className={`${size} transition-colors duration-300 ${isInWishlist
                        ? 'fill-black text-black'
                        : 'fill-transparent text-gray-600 hover:text-black'
                    }`}
            />
        </button>
    );
}
