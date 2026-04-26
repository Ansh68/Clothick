import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import useCartStore from '../store/cartStore';

export default function CartIcon() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Link to="/cart" className="relative hover:text-darkColor hoverEffect">
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
