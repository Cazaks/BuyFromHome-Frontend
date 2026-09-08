import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrdersAdmin } from "../api/orders";
import { useAuth } from "../context/useAuth";

export default function AdminOrderList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllOrdersAdmin(user.token)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-900">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-100 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-900">
              <tr>
                <th className="p-3">Order #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="border-b border-gray-200 dark:border-gray-900">
                  <td className="p-3">{order.orderNumber}</td>
                  <td className="p-3">User #{order.userId}</td>
                  <td className="p-3">${Number(order.totalAmount).toFixed(2)}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">{order.paymentStatus}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin/orders/${order.orderId}`}
                      className="text-primary-500 hover:underline"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}