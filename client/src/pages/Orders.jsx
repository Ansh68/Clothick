import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FileX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchMyOrders } from '../api/orders';
import Container from '../components/Container';
import Loading from '../components/Loading';

export default function Orders() {
  const { user, loading } = useAuth();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrders,
    enabled: !!user,
  });

  if (loading || (user && isLoading)) return <Loading />;
  if (!user) return <Navigate to="/signin" replace />;

  return (
    <Container className="py-10">
      {orders.length ? (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{order.orderNumber?.slice(0, 8)}...</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">₹{order.totalPrice?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <FileX className="h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">No orders yet</h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            Start shopping to see your orders here.
          </p>
          <Link to="/" className="mt-6 px-6 py-2 bg-darkColor text-white rounded-lg hover:opacity-90">
            Browse Products
          </Link>
        </div>
      )}
    </Container>
  );
}
