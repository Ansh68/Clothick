export default function PriceView({ price, discount, className = '' }) {
  if (price == null) return null;
  const discountAmount = ((discount || 0) * price) / 100;
  const finalPrice = price - discountAmount;

  return (
    <div className={className}>
      {discount > 0 ? (
        <>
          <span className="line-through text-gray-500 mr-2">₹{price.toFixed(2)}</span>
          <span className="font-semibold text-green-600">₹{finalPrice.toFixed(2)}</span>
        </>
      ) : (
        <span className="font-semibold">₹{price.toFixed(2)}</span>
      )}
    </div>
  );
}
