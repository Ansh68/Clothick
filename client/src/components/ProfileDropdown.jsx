import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    User,
    ShoppingBag,
    Heart,
    LogOut,
} from 'lucide-react';

export default function ProfileDropdown() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    const menuItems = [
        { icon: User, label: 'Profile', to: '/account' },
        { icon: ShoppingBag, label: 'My Orders', to: '/orders' },
        { icon: Heart, label: 'Wishlist', to: '/wishlist' },
    ];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs hover:opacity-90 transition-opacity"
            >
                {user.name?.charAt(0).toUpperCase() || 'U'}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-50 animate-fadeIn">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">My Account</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Icon className="w-4 h-4 text-gray-400" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1" />

                    {/* Sign Out */}
                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                            navigate('/');
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
