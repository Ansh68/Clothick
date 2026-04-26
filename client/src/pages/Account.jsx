import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { fetchMyOrders } from '../api/orders';
import { fetchAddresses, addAddress, updateAddress, deleteAddress, updateProfile } from '../api/auth';
import Container from '../components/Container';
import PriceView from '../components/PriceView';
import {
    ChevronLeft,
    ChevronRight,
    Package,
    HelpCircle,
    MessageCircle,
    FileText,
    Shield,
    Loader2,
    X,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Section Row ──────────────────────────────────────────
function SectionRow({ label, onClick, rightText }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-6 border-b border-gray-200 group text-left"
        >
            <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">{label}</span>
            {rightText ? (
                <span className="text-sm text-gray-500">{rightText}</span>
            ) : (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            )}
        </button>
    );
}

// ─── Addresses Page ───────────────────────────────────────
function AddressesView({ onBack }) {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });

    const { data: addresses = [], isLoading } = useQuery({
        queryKey: ['addresses'],
        queryFn: fetchAddresses,
    });

    const addMutation = useMutation({
        mutationFn: (data) => addAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            toast.success('Address added');
            resetForm();
        },
        onError: () => toast.error('Failed to add address'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            toast.success('Address updated');
            resetForm();
        },
        onError: () => toast.error('Failed to update address'),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            toast.success('Address deleted');
        },
        onError: () => toast.error('Failed to delete address'),
    });

    const resetForm = () => {
        setForm({ name: '', phone: '', address: '', city: '', pincode: '' });
        setShowForm(false);
        setEditId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
            toast.error('All fields are required');
            return;
        }
        if (editId) {
            updateMutation.mutate({ id: editId, data: form });
        } else {
            addMutation.mutate(form);
        }
    };

    const handleEdit = (addr) => {
        setForm({ name: addr.name, phone: addr.phone, address: addr.address, city: addr.city, pincode: addr.pincode });
        setEditId(addr._id);
        setShowForm(true);
    };

    const isSaving = addMutation.isLoading || updateMutation.isLoading;

    return (
        <div className="bg-[#faf9f7] min-h-screen">
            <Container className="py-10 max-w-2xl">
                {/* Title */}
                <h1 className="text-2xl font-black text-gray-900 text-center mb-6 uppercase tracking-wide">
                    Addresses
                </h1>

                {/* Return link */}
                <div className="text-center mb-8">
                    <button
                        onClick={onBack}
                        className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
                    >
                        Return to Account details
                    </button>
                </div>

                {/* Add new address button */}
                <div className="text-center mb-10">
                    <button
                        onClick={() => { resetForm(); setShowForm(true); }}
                        className="px-8 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
                    >
                        Add a new address
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                {editId ? 'Edit Address' : 'New Address'}
                            </h3>
                            <button onClick={resetForm}>
                                <X className="w-4 h-4 text-gray-400 hover:text-black" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input placeholder="Full Name" value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black w-full" />
                                <input placeholder="Phone Number" value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black w-full" />
                            </div>
                            <input placeholder="Street Address" value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input placeholder="City" value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    className="px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black w-full" />
                                <input placeholder="Pincode" value={form.pincode}
                                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                                    className="px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black w-full" />
                            </div>
                            <button type="submit" disabled={isSaving}
                                className="w-full py-3 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50">
                                {isSaving ? 'Saving...' : editId ? 'Update Address' : 'Save Address'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Address List */}
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                ) : addresses.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-10">
                        No addresses saved yet. Add your first address above.
                    </p>
                ) : (
                    <div className="space-y-8">
                        {addresses.map((addr, i) => (
                            <div key={addr._id} className="text-center">
                                {/* Label */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {i === 0 ? 'Default' : `Address ${i + 1}`}
                                </h3>

                                {/* Address Details */}
                                <p className="text-base text-gray-800 font-medium">{addr.name}</p>
                                <p className="text-base text-gray-700 mt-1">{addr.address}</p>
                                <p className="text-base text-gray-700">{addr.pincode} {addr.city}</p>
                                <p className="text-base text-gray-700">India</p>

                                {/* Actions */}
                                <div className="flex justify-center gap-4 mt-5">
                                    <button
                                        onClick={() => handleEdit(addr)}
                                        className="px-10 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteMutation.mutate(addr._id)}
                                        className="px-10 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

// ─── Contact Number Editor ────────────────────────────────
function ContactView({ onBack, currentPhone }) {
    const { refreshUser } = useAuth();
    const [phone, setPhone] = useState(currentPhone || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!phone.trim()) {
            toast.error('Please enter a phone number');
            return;
        }
        setSaving(true);
        try {
            await updateProfile({ phone });
            await refreshUser();
            toast.success('Contact number updated');
            onBack();
        } catch {
            toast.error('Failed to update contact number');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#faf9f7] min-h-screen">
            <Container className="py-10 max-w-2xl">
                <button onClick={onBack}
                    className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline mb-8">
                    <ChevronLeft className="w-4 h-4" /> BACK
                </button>

                <h1 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-wide">
                    Contact Number
                </h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 border border-gray-200 bg-white text-sm focus:outline-none focus:border-black"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Contact Number'}
                    </button>
                </div>
            </Container>
        </div>
    );
}

// ─── Main Account Page ────────────────────────────────────
export default function Account() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab');
    const [activeView, setActiveView] = useState(initialTab || 'main');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) setActiveView(tab);
    }, [searchParams]);

    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrders,
        enabled: !!user,
    });

    if (!user) {
        return (
            <Container className="py-20 text-center">
                <h1 className="text-2xl font-bold mb-3">Please Sign In</h1>
                <p className="text-gray-500 mb-6">You need to be signed in to access your account.</p>
                <Link to="/signin" className="px-6 py-2.5 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900">
                    Sign In
                </Link>
            </Container>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // ─── Addresses View ──────────────────────────────────
    if (activeView === 'addresses') {
        return <AddressesView onBack={() => setActiveView('profile')} />;
    }

    // ─── Contact Number View ─────────────────────────────
    if (activeView === 'contact') {
        return <ContactView onBack={() => setActiveView('profile')} currentPhone={user.phone} />;
    }

    // ─── Profile View ────────────────────────────────────
    if (activeView === 'profile') {
        return (
            <div className="bg-[#faf9f7] min-h-screen">
                <Container className="py-10 max-w-2xl">
                    <button onClick={() => setActiveView('main')}
                        className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline mb-8">
                        <ChevronLeft className="w-4 h-4" /> BACK
                    </button>

                    <h1 className="text-2xl font-black text-gray-900 mb-10">
                        HELLO, {user.name?.toUpperCase()}!
                    </h1>

                    {/* Addresses - clickable row with chevron */}
                    <SectionRow label="ADDRESSES" onClick={() => setActiveView('addresses')} />

                    {/* Contact Number - clickable to edit */}
                    <SectionRow
                        label="CONTACT NUMBER"
                        onClick={() => setActiveView('contact')}
                        rightText={user.phone || 'Not set'}
                    />

                    {/* Profile / Email - non-clickable display */}
                    <SectionRow label="EMAIL" rightText={user.email} />

                    <button onClick={handleLogout}
                        className="mt-8 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black">
                        Logout
                    </button>
                </Container>
            </div>
        );
    }

    // ─── Purchases View ──────────────────────────────────
    if (activeView === 'purchases') {
        return (
            <div className="bg-[#faf9f7] min-h-screen">
                <Container className="py-10 max-w-2xl">
                    <button onClick={() => setActiveView('main')}
                        className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline mb-8">
                        <ChevronLeft className="w-4 h-4" /> BACK
                    </button>

                    <h1 className="text-2xl font-black text-gray-900 mb-10">YOUR ORDERS</h1>

                    {orders.length === 0 ? (
                        <div className="text-center py-16">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No orders yet. Start shopping!</p>
                            <Link to="/shop" className="inline-block mt-4 px-6 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-900">
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Order #{order.orderNumber}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                {item.product?.images?.[0] && (
                                                    <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded object-cover border" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                                <PriceView price={item.product?.price} discount={item.product?.discount} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                                        <span className="text-xs text-gray-500">Total</span>
                                        <span className="text-sm font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={handleLogout}
                        className="mt-8 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black">
                        Logout
                    </button>
                </Container>
            </div>
        );
    }

    // ─── Help View ───────────────────────────────────────
    if (activeView === 'help') {
        return (
            <div className="bg-[#faf9f7] min-h-screen">
                <Container className="py-10 max-w-2xl">
                    <button onClick={() => setActiveView('main')}
                        className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline mb-8">
                        <ChevronLeft className="w-4 h-4" /> BACK
                    </button>

                    <h1 className="text-2xl font-black text-gray-900 mb-10">HELP & SUPPORT</h1>

                    <div className="space-y-3">
                        <Link to="/faqs" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                            <HelpCircle className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">FAQs</p>
                                <p className="text-xs text-gray-400 mt-0.5">Browse frequently asked questions</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>

                        <Link to="/contact" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                            <MessageCircle className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Contact Us</p>
                                <p className="text-xs text-gray-400 mt-0.5">Reach out to support@clothick.com</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>

                        <Link to="/terms" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Terms & Conditions</p>
                                <p className="text-xs text-gray-400 mt-0.5">Read our terms of service</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>

                        <Link to="/privacy" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Privacy Policy</p>
                                <p className="text-xs text-gray-400 mt-0.5">How we protect your data</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                    </div>

                    <button onClick={handleLogout}
                        className="mt-8 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black">
                        Logout
                    </button>
                </Container>
            </div>
        );
    }

    // ─── Main View ───────────────────────────────────────
    return (
        <div className="bg-[#faf9f7] min-h-screen">
            <Container className="py-10 max-w-2xl">
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline mb-8">
                    <ChevronLeft className="w-4 h-4" /> BACK
                </button>

                <h1 className="text-2xl font-black text-gray-900 mb-10">
                    HELLO, {user.name?.toUpperCase()}!
                </h1>

                <SectionRow label="PROFILE" onClick={() => setActiveView('profile')} />
                <SectionRow label="PURCHASES" onClick={() => setActiveView('purchases')} />
                <SectionRow label="HELP" onClick={() => setActiveView('help')} />

                <button onClick={handleLogout}
                    className="mt-8 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black">
                    Logout
                </button>
            </Container>
        </div>
    );
}
