import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product, className = '' }) {
  const addItem = useCartStore((s) => s.addItem);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate('/signin');
      toast.error('Please sign in to add to cart');
      return;
    }
    addItem(product);
    toast.success('Added to cart');
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md border border-darkColor/30 text-darkColor hover:bg-darkColor hover:text-white hoverEffect ${className}`}
    >
      Add to Cart
    </button>
  );
}
