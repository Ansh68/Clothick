import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from './Container';
import CartIcon from './CartIcon';
import WishlistIcon from './WishlistIcon';
import ProfileDropdown from './ProfileDropdown';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { title: 'Home', link: '/' },
    { title: 'Men', link: '/men' },
    { title: 'Women', link: '/women' },
    { title: 'New', link: '/new-arrivals' },
    { title: 'Shop', link: '/shop' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-4">
      <Container className="flex items-center justify-between gap-5 text-lightColor relative">
        <Link to="/" className="text-xl font-bold tracking-tighter text-black uppercase absolute left-1/2 transform -translate-x-1/2">
          Clothick
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`relative group overflow-hidden font-medium text-xs uppercase tracking-wider hover:text-black duration-300 ${location.pathname === item.link ? 'text-black' : 'text-gray-500'}`}
            >
              {item.title}
              <span className={`w-full h-[1.5px] bg-black absolute bottom-0 left-0 transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ${location.pathname === item.link ? 'translate-x-0' : ''}`} />
            </Link>
          ))}
        </nav>

        <div className="flex-1"></div>

        <div className="flex items-center justify-end gap-5">
          {showSearch ? (
            <form onSubmit={handleSearch} className="absolute top-20 left-0 w-full bg-white p-4 border-b flex items-center justify-center gap-2 z-50 shadow-md md:relative md:top-0 md:bg-transparent md:p-0 md:border-none md:shadow-none md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-black w-full md:w-48"
                autoFocus
              />
              <button type="button" onClick={() => setShowSearch(false)} className="md:hidden">
                <X className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <button onClick={() => setShowSearch(true)} className="text-gray-500 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}

          <WishlistIcon />

          <CartIcon />

          {user ? (
            <ProfileDropdown />
          ) : (
            <Link to="/signin" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors uppercase">
              Login
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
