import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  BadgeIndianRupee,
  Users,
  MapPin,
} from 'lucide-react';
import Container from '../components/Container';

const stats = [
  { value: '120K+', label: 'Happy Customers' },
  { value: '8000+', label: 'Products Listed' },
  { value: '5+', label: 'Years of Trust' },
];

const missionStats = [
  { value: '2020', label: 'Founded' },
  { value: '45+', label: 'Team Size' },
  { value: '4.9 ★', label: 'Avg. Rating' },
  { value: '< 2%', label: 'Return Rate' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    description:
      'Every product in our catalog is carefully vetted to meet the highest standards of performance and durability.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description:
      'From browsing to delivery, we\'re obsessed with speed. Orders are processed and dispatched within 24 hours.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description:
      'We genuinely care about your experience. Our support team is always here to make things right.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Transparent Pricing',
    description:
      'No hidden fees, no surprises. What you see is what you pay — fair, honest, always.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'Built around real feedback from real customers. Every feature we ship comes from listening to you.',
  },
  {
    icon: MapPin,
    title: 'Delhi NCR Reach',
    description:
      'Serving customers across Delhi, Gurgaon, and Noida with fast local delivery and personalized service.',
  },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Section 1: Our Story */}
      <section className="border-b border-gray-100">
        <Container className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-2xl">
            Built for people who love great products.
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl leading-relaxed">
            Clothick started with a simple belief — shopping for quality fashion shouldn't be
            complicated, overpriced, or frustrating. Since 2020, we've been on a mission to make
            premium clothing accessible to everyone across Delhi, Gurgaon, and Noida — delivered
            with the care and speed you deserve.
          </p>
        </Container>
      </section>

      {/* Section 2: Stats */}
      <section className="border-b border-gray-100">
        <Container className="py-12">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1 italic">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3: Our Mission */}
      <section className="border-b border-gray-100">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Connecting people with the fashion they love.
              </h2>
              <p className="text-gray-600 mt-6 leading-relaxed">
                We exist to close the gap between great fashion and the people who need it.
                Our platform curates only the best — rigorously tested, fairly priced, and rapidly
                delivered — because we believe everyone deserves access to clothing that makes life
                better.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                We're not just a marketplace. We're a team of fashion enthusiasts who genuinely love
                the products we carry. Every listing, every deal, and every recommendation comes from
                a place of real passion and expertise. Proudly serving customers across the Delhi NCR region.
              </p>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {missionStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Core Values */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our core values
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              These aren't just words on a wall — they shape every decision we make, every
              product we pick, and every interaction we have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-colors">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
