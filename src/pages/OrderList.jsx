import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { fetchMyOrders } from "../api/orders";
import { useAuth } from "../context/useAuth";

const statusColors = {
  PENDING: "text-yellow-600",
  CONFIRMED: "text-blue-600",
  PROCESSING: "text-blue-600",
  SHIPPED: "text-purple-600",
  DELIVERED: "text-green-600",
  CANCELLED: "text-red-600",
};

export default function OrderList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyOrders(user.token)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.token]);

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-10">My Orders</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.orderId}
            to={`/orders/${order.orderId}`}
            className="block p-6 rounded-lg border border-gray-200 dark:border-gray-900 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{order.orderNumber}</span>
              <span className={`text-sm font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
            </p>
            <p className="font-bold mt-2">${Number(order.totalAmount).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}