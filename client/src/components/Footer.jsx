import { Link } from 'react-router-dom';
import { quickLinksData, categoriesData } from '../constants/index';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="text-xl font-bold text-darkColor">
            Clothick
          </Link>
          <p className="text-gray-600 text-sm">
            Discover curated collections at Clothick, blending style and comfort.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
          <ul className="space-y-3">
            {quickLinksData.map((item) => (
              <li key={item.title}>
                <Link to={item.href} className="text-gray-600 hover:text-gray-900 text-sm font-medium hoverEffect">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {categoriesData.map((item) => (
              <li key={item.title}>
                <Link to={item.href} className="text-gray-600 hover:text-gray-900 text-sm font-medium hoverEffect">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
