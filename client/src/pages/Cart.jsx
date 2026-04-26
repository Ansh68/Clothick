import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Trash2, Minus, Plus } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { useAuth } from '../context/AuthContext';
import Container from '../components/Container';
import EmptyCart from '../components/EmptyCart';
import Loading from '../components/Loading';
import { createRazorpayOrder, verifyRazorpayPayment } from '../api/checkout';
import toast from 'react-hot-toast';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    getGroupedItems,
    getTotalPrice,
    getSubTotalPrice,
    getItemCount,
    addItem,
    removeItem,
    deleteCartProduct,
    resetCart,
  } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Loading />;

  const groupedItems = getGroupedItems();

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error('Failed to load Razorpay');

      const { keyId, orderId, amount, currency, orderNumber } =
        await createRazorpayOrder(groupedItems);

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Clothick',
        description: 'Order payment',
        order_id: orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              ...response,
              orderNumber,
              items: groupedItems,
            });
            navigate(`/success?orderNumber=${orderNumber}`);
          } catch (err) {
            toast.error(err.response?.data?.error || 'Payment verification failed');
          }
        },
        theme: { color: '#151515' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        toast.error(resp?.error?.description || 'Payment failed');
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!groupedItems.length)
    return (
      <Container>
        <EmptyCart />
      </Container>
    );

  const subtotal = getSubTotalPrice();
  const total = getTotalPrice();
  const discount = subtotal - total;
  const totalItems = groupedItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-sm text-blue-600 font-medium">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {groupedItems.map(({ product, quantity }) => {
                const itemPrice = (product?.price ?? 0) * quantity;
                const inWishlist = isInWishlist(product._id);

                return (
                  <div
                    key={product._id}
                    className="p-5 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      {product?.images?.[0] && (
                        <Link to={`/product/${product.slug}`} className="shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg border border-gray-100"
                          />
                        </Link>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-base font-bold text-gray-900 line-clamp-1">
                              {product?.name}
                            </h2>
                            <p className="text-sm text-gray-400 italic mt-0.5 line-clamp-1">
                              {product?.intro}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900 shrink-0">
                            ₹{itemPrice.toFixed(2)}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {product?.variant && (
                            <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded bg-gray-900 text-white">
                              COLOR: {product.variant}
                            </span>
                          )}
                          {product?.status && (
                            <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded border border-blue-300 text-blue-600">
                              STATUS: {product.status}
                            </span>
                          )}
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            {/* Save to Wish */}
                            <button
                              onClick={() => {
                                toggleItem(product);
                                toast.success(
                                  inWishlist ? 'Removed from wishlist' : 'Added to wishlist'
                                );
                              }}
                              className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${inWishlist
                                  ? 'text-black'
                                  : 'text-gray-500 hover:text-black'
                                }`}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${inWishlist ? 'fill-black' : ''
                                  }`}
                              />
                              {inWishlist ? 'Saved' : 'Save to Wish'}
                            </button>

                            {/* Remove Item */}
                            <button
                              onClick={() => {
                                deleteCartProduct(product._id);
                                toast.success('Item removed');
                              }}
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove Item
                            </button>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => removeItem(product._id)}
                              className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                            <span className="px-4 py-1.5 text-sm font-semibold text-gray-900 border-x border-gray-300 min-w-[40px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => addItem(product)}
                              className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => {
                    resetCart();
                    toast.success('Cart cleared');
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Discount</span>
                  <span className="text-green-600 font-medium">
                    -₹{discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Checkout / Sign In Button */}
              {user ? (
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full mt-5 py-3.5 rounded-lg font-semibold bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="block w-full mt-5 py-3.5 rounded-lg font-semibold bg-black text-white text-center hover:bg-gray-900 transition-colors text-sm"
                >
                  Sign In to Checkout
                </Link>
              )}

              <Link
                to="/"
                className="block text-center text-xs text-gray-500 hover:text-black mt-3 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
