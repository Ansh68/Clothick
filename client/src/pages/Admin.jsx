import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Container from '../components/Container';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import PriceView from '../components/PriceView';
import { Trash2, AlertTriangle, X } from 'lucide-react';

// Custom Delete Confirmation Modal
function DeleteModal({ product, onConfirm, onCancel, isDeleting }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                </div>

                {/* Content */}
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Delete Product
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                        Are you sure you want to delete
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mb-4">
                        "{product.name}"?
                    </p>
                    <p className="text-xs text-gray-400 mb-6">
                        This action cannot be undone. The product will be permanently removed.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading: isLoadingProducts } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product deleted successfully');
            setProductToDelete(null);
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete product');
            setProductToDelete(null);
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const toastId = toast.loading('Creating product...');

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('intro', data.intro);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('discount', data.discount);
            formData.append('status', data.status);
            formData.append('variant', data.variant);
            formData.append('stock', data.stock);
            formData.append('gender', data.gender);

            if (data.images && data.images.length > 0) {
                for (let i = 0; i < data.images.length; i++) {
                    formData.append('images', data.images[i]);
                }
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Product created!', { id: toastId });
            reset();
            queryClient.invalidateQueries(['products']);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create product', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.email !== 'adminclothick@gmail.com') {
        return (
            <Container className="py-20 text-center">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Add Product</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4 bg-white p-8 rounded-xl shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input required {...register('name')} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Variant</label>
                        <select {...register('variant')} className="w-full border p-2 rounded">
                            <option value="others">Others</option>
                            <option value="tshirt">T-Shirt</option>
                            <option value="jacket">Jacket</option>
                            <option value="pants">Pants</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="short">Short</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Short Intro</label>
                    <input required {...register('intro')} className="w-full border p-2 rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select {...register('gender')} className="w-full border p-2 rounded">
                            <option value="unisex">Unisex</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea required {...register('description')} rows={4} className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input type="number" step="0.01" required {...register('price')} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount %</label>
                        <input type="number" defaultValue={0} {...register('discount')} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input type="number" defaultValue={0} {...register('stock')} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select {...register('status')} className="w-full border p-2 rounded">
                            <option value="">None</option>
                            <option value="new">New</option>
                            <option value="hot">Hot</option>
                            <option value="sale">Sale</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Images</label>
                    <input type="file" multiple accept="image/*" {...register('images')} className="w-full border p-2 rounded" />
                    <p className="text-xs text-gray-500 mt-1">Upload multiple images (jpg, png, webp)</p>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>

            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-6">Product List ({products.length})</h2>
                {isLoadingProducts ? (
                    <p>Loading products...</p>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                    <tr>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product.images?.[0] || 'https://via.placeholder.com/40'}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded object-cover border"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                            <td className="px-6 py-4 capitalize">{product.variant}</td>
                                            <td className="px-6 py-4">
                                                <PriceView price={product.price} discount={product.discount} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setProductToDelete(product)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {products.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No products found. Add some above!</div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                product={productToDelete}
                onConfirm={() => deleteMutation.mutate(productToDelete._id)}
                onCancel={() => setProductToDelete(null)}
                isDeleting={deleteMutation.isLoading}
            />
        </Container>
    );
}
