import useCartStore from '../store/cartStore';
import { Minus, Plus } from 'lucide-react';

export default function QuantityButtons({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const count = useCartStore((s) => s.getItemCount(product._id));

  return (
    <div className="flex items-center gap-2 border rounded-md w-fit">
      <button
        onClick={() => removeItem(product._id)}
        className="p-2 hover:bg-gray-100 rounded-l"
        aria-label="Decrease"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-3 font-medium">{count}</span>
      <button
        onClick={() => addItem(product)}
        className="p-2 hover:bg-gray-100 rounded-r"
        aria-label="Increase"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
