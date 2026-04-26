import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Heart,
  Truck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Share2,
  HelpCircle,
  ArrowLeftRight,
} from 'lucide-react';
import { fetchProductBySlug } from '../api/products';
import Container from '../components/Container';
import PriceView from '../components/PriceView';
import AddToCartButton from '../components/AddToCartButton';
import Loading from '../components/Loading';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function Product() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCharacteristics, setShowCharacteristics] = useState(false);

  const toggleItem = useWishlistStore((s) => s.toggleItem);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  const isInWishlist = useWishlistStore((s) =>
    s.items.some((i) => i._id === product?._id)
  );

  if (isLoading) return <Loading />;
  if (error || !product) return <Navigate to="/" replace />;

  const images = product?.images || [];
  const currentImage = images[selectedImage] || images[0];

  const handleWishlist = () => {
    toggleItem(product);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const discountAmount = product?.discount
    ? ((product.discount * product.price) / 100).toFixed(2)
    : 0;
  const finalPrice = product?.discount
    ? (product.price - discountAmount).toFixed(2)
    : product?.price?.toFixed(2);

  return (
    <div className="bg-white min-h-screen">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black font-medium truncate max-w-xs">
            {product?.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Image Section */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 rounded-lg overflow-hidden">
              {product?.discount > 0 && (
                <span className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1.5 rounded z-10">
                  {product.discount}% OFF
                </span>
              )}
              {currentImage && (
                <img
                  src={currentImage}
                  alt={product?.name}
                  className="w-full h-[400px] md:h-[480px] object-contain p-4 transition-opacity duration-300"
                />
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${selectedImage === idx
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product?.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4">
            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product?.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black">
                ₹{finalPrice}
              </span>
              {product?.discount > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product?.stock > 0 ? (
                <span className="inline-block bg-green-50 text-green-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-green-200">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-red-200">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            {product?.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Intro */}
            {product?.intro && (
              <p className="text-gray-500 text-sm italic">{product.intro}</p>
            )}

            {/* Add to Cart + Wishlist */}
            <div className="flex items-center gap-3 mt-2">
              <AddToCartButton
                product={product}
                className="flex-1 bg-darkColor text-white hover:bg-darkColor/90 hoverEffect px-6 py-3 rounded-md text-sm font-semibold text-center"
              />
              <button
                onClick={handleWishlist}
                className={`border-2 px-3.5 py-2.5 rounded-md transition-all duration-300 hover:scale-105 ${isInWishlist
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                  }`}
                title={
                  isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${isInWishlist ? 'fill-white' : ''
                    }`}
                />
              </button>
            </div>

            {/* Characteristics Accordion */}
            <button
              onClick={() => setShowCharacteristics(!showCharacteristics)}
              className="flex items-center justify-between w-full py-3 border-t border-b border-gray-200 mt-2 group"
            >
              <span className="text-sm font-semibold text-gray-800">
                {product?.name}: Characteristics
              </span>
              {showCharacteristics ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {showCharacteristics && (
              <div className="text-sm text-gray-600 space-y-2 pb-3 animate-fadeIn">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Variant</span>
                  <span className="capitalize font-medium">
                    {product?.variant || '—'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Gender</span>
                  <span className="capitalize font-medium">
                    {product?.gender || '—'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Status</span>
                  <span className="capitalize font-medium">
                    {product?.status || '—'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Stock</span>
                  <span className="font-medium">{product?.stock ?? 0}</span>
                </div>
                {product?.discount > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-600">
                      {product.discount}% off
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <ArrowLeftRight className="w-4 h-4" />
                Compare color
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <HelpCircle className="w-4 h-4" />
                Ask a question
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <Truck className="w-4 h-4" />
                Delivery & Return
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="font-semibold text-sm text-gray-900">
                  Free Shipping
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Free shipping over order ₹1200
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="font-semibold text-sm text-gray-900">
                  Flexible Payment
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Pay with Multiple Credit Cards
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
