import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchOrderByIdAdmin,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrderTracking,
} from "../api/orders";
import { useAuth } from "../context/useAuth";

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"];

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);

  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  const load = () => {
    setLoading(true);
    fetchOrderByIdAdmin(orderId, user.token)
      .then((data) => {
        setOrder(data);
        setCourierName(data.courierName || "");
        setTrackingNumber(data.trackingNumber || "");
        setTrackingUrl(data.trackingUrl || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [orderId, user.token]);

  const handleStatusChange = async (status) => {
    setSavingStatus(true);
    try {
      await updateOrderStatus(orderId, status, user.token);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStatus(false);
    }
  };

  const handlePaymentStatusChange = async (paymentStatus) => {
    setSavingStatus(true);
    try {
      await updatePaymentStatus(orderId, paymentStatus, user.token);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveTracking = async () => {
    setSavingStatus(true);
    try {
      await updateOrderTracking(
        orderId,
        { courierName, trackingNumber, trackingUrl },
        user.token
      );
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStatus(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{order.orderNumber}</h2>
      <p className="text-gray-500 mb-6">
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-900">
          <label className="block mb-2 text-sm font-medium">Order Status</label>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={savingStatus}
            className="block w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-900">
          <label className="block mb-2 text-sm font-medium">Payment Status</label>
          <select
            value={order.paymentStatus}
            onChange={(e) => handlePaymentStatusChange(e.target.value)}
            disabled={savingStatus}
            className="block w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
          >
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-900 mb-8">
        <h3 className="font-bold mb-4">Tracking Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            value={courierName}
            onChange={(e) => setCourierName(e.target.value)}
            placeholder="Courier name"
            className="px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
          />
          <input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking number"
            className="px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
          />
          <input
            value={trackingUrl}
            onChange={(e) => setTrackingUrl(e.target.value)}
            placeholder="Tracking URL (optional)"
            className="px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
          />
        </div>
        <button
          onClick={handleSaveTracking}
          disabled={savingStatus}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          Save Tracking Info
        </button>
      </div>

      <h3 className="font-bold mb-4">Items</h3>
      <div className="space-y-3">
        {order.items.map((item) => (
          <div
            key={item.orderItemId}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-900"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-500">
                {item.productVariety} · {item.measurementUnit} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold">${Number(item.subtotal).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}