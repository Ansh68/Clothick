import Container from '../components/Container';
import HomeBanner from '../components/HomeBanner';
import PromoCards from '../components/PromoCards';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <Container className="py-10">
      <HomeBanner />
      <PromoCards />
      <ProductGrid />
    </Container>
  );
}
