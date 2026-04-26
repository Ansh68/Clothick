import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../api/products';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function Category() {
  const { slug } = useParams();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'category', slug],
    queryFn: () => fetchProductsByCategory(slug),
  });

  return (
    <Container className="py-10">
      <h1 className="text-xl mb-6">
        Products by Category: <span className="font-bold text-green-600 capitalize">{slug}</span>
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <p className="text-gray-500 text-center py-8">No products in this category.</p>
      )}
    </Container>
  );
}
