import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from './Container';
import CartIcon from './CartIcon';
import WishlistIcon from './WishlistIcon';
import ProfileDropdown from './ProfileDropdown';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

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

  const leftLinks = [
    { title: 'Women', link: '/women' },
    { title: 'Men', link: '/men' },
    { title: 'Shop', link: '/shop' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <Container className="relative flex items-center justify-between h-14">

        {/* Left — Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {leftLinks.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`text-[13px] font-semibold uppercase tracking-wider transition-colors duration-200 ${location.pathname === item.link
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Center — Logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-extrabold tracking-tight text-black uppercase"
        >
          Clothick
        </Link>

        {/* Right — Icons */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Search */}
          {showSearch ? (
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm focus:outline-none w-36"
                autoFocus
              />
              <button
                type="button"
                onClick={() => { setShowSearch(false); setSearchQuery(''); }}
              >
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-black" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
          )}

          <WishlistIcon />
          <CartIcon />

          {user ? (
            <ProfileDropdown />
          ) : (
            <Link
              to="/signin"
              className="text-[13px] font-semibold text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
