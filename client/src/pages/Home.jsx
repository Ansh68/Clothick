import Container from '../components/Container';
import HomeBanner from '../components/HomeBanner';
import PromoCards from '../components/PromoCards';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div>
      {/* Full-width Hero — no Container wrapper */}
      <HomeBanner />

      {/* Contained Sections */}
      <Container className="py-10">
        {/* Promo Cards */}
        <PromoCards />

        {/* Section Header */}
        <div className="mt-16 mb-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Trending Now
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Handpicked styles that our customers love right now
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </Container>
    </div>
  );
}
