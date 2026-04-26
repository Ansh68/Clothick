import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
      <Link to="/" className="px-6 py-2 bg-darkColor text-white rounded-lg hover:opacity-90 hoverEffect">
        Continue Shopping
      </Link>
    </div>
  );
}
