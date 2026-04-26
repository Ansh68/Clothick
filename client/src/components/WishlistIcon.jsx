import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';

export default function WishlistIcon() {
    const items = useWishlistStore((s) => s.items);
    const count = items.length;

    return (
        <Link to="/wishlist" className="relative hover:text-darkColor hoverEffect text-gray-500 hover:text-black transition-colors">
            <Heart className="w-5 h-5" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                    {count}
                </span>
            )}
        </Link>
    );
}
