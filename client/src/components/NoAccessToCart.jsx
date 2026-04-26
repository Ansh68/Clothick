import { Link } from 'react-router-dom';

export default function NoAccessToCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-xl text-gray-600 mb-4">Please sign in to view your cart.</p>
      <Link to="/signin" className="px-6 py-2 bg-darkColor text-white rounded-lg hover:opacity-90 hoverEffect">
        Sign In
      </Link>
    </div>
  );
}
