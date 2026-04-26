import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Home, Package, ShoppingBag } from 'lucide-react';
import useCartStore from '../store/cartStore';

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const resetCart = useCartStore((s) => s.resetCart);

  useEffect(() => {
    if (orderNumber) resetCart();
  }, [orderNumber, resetCart]);

  return (
    <div className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="text-white w-12 h-12" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. We're processing your order.
        </p>
        {orderNumber && (
          <p className="text-gray-700 mb-6">
            Order Number: <span className="font-semibold text-black">{orderNumber}</span>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Home className="w-5 h-5 mr-2" /> Home
          </Link>
          <Link
            to="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold border border-black rounded-lg hover:bg-gray-100"
          >
            <Package className="w-5 h-5 mr-2" /> Orders
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <ShoppingBag className="w-5 h-5 mr-2" /> Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
