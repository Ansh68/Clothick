import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/images/hero-banner.jpg',
    subtitle: 'NEW SEASON 2026',
    title: 'Define Your Style',
    cta: { text: 'Shop Now', link: '/shop' },
  },
  {
    image: '/images/hero-slide-2.jpg',
    subtitle: 'CURATED ESSENTIALS',
    title: 'Everyday Comfort',
    cta: { text: 'Shop Women', link: '/women' },
  },
  {
    image: '/images/hero-slide-3.jpg',
    subtitle: 'THE BASICS COLLECTION',
    title: 'Elevated Basics',
    cta: { text: 'Shop Men', link: '/men' },
  },
];

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] overflow-hidden bg-black">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content — centered at bottom */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Subtitle */}
            <p className="text-white/70 text-xs sm:text-sm uppercase tracking-[4px] font-medium mb-3">
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight">
              {slide.title}
            </h1>

            {/* CTA */}
            <Link
              to={slide.cta.link}
              className="mt-7 inline-block px-10 py-3 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300"
            >
              {slide.cta.text}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${i === current
              ? 'w-8 h-2 bg-white'
              : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </section>
  );
}
