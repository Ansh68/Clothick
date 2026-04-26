import { Link } from 'react-router-dom';
import { Heart, BarChart3, Share2 } from 'lucide-react';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const imageUrl = product?.images?.[0];
  const slug = product?.slug;
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) =>
    s.items.some((i) => i._id === product?._id)
  );

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: `/product/${slug}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/product/${slug}`);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="rounded-lg overflow-hidden group text-sm">
      <div className="overflow-hidden relative bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200">
        {/* Discount Badge */}
        {product?.discount > 0 && (
          <span className="absolute top-3 right-3 bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded z-10">
            {product.discount}% OFF
          </span>
        )}

        {/* Product Image */}
        {imageUrl && (
          <Link to={`/product/${slug}`}>
            <img
              src={imageUrl}
              alt={product?.name}
              className={`w-full h-72 object-contain overflow-hidden transition-transform duration-500 ${product?.stock !== 0 ? 'group-hover:scale-105' : ''
                }`}
            />
          </Link>
        )}

        {/* Action Icons - Slide Up from Bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-3 bg-white/90 backdrop-blur-sm border-t border-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button
            onClick={handleWishlist}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-[18px] h-[18px] transition-colors duration-200 ${isInWishlist
                ? 'fill-black text-black'
                : 'text-gray-700 hover:text-black'
                }`}
            />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            title="Share"
          >
            <Share2 className="w-[18px] h-[18px] text-gray-700 hover:text-black transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-md rounded-tl-none rounded-tr-none">
        <h3 className="text-base font-semibold line-clamp-1">{product?.name}</h3>
        <p className="text-gray-600 truncate">{product?.intro}</p>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-lg"
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
