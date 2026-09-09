import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { fetchMyOrderById } from "../api/orders";
import { useAuth } from "../context/useAuth";
import ReviewForm from "../components/ReviewForm";

const statusSteps = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

export default function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewingItem, setReviewingItem] = useState(null);

  useEffect(() => {
    fetchMyOrderById(id, user.token)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, user.token]);

  if (loading) return <Container className="py-20 text-center">Loading...</Container>;
  if (error) return <Container className="py-20 text-center text-red-500">{error}</Container>;
  if (!order) return null;

  const currentStepIndex = statusSteps.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <h1 className="text-2xl font-bold mb-2">{order.orderNumber}</h1>
      <p className="text-gray-500 mb-8">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>

      {/* Status Timeline */}
      {!isCancelled ? (
        <div className="flex items-center mb-10 overflow-x-auto">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex items-center flex-1 min-w-[100px]">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index <= currentStepIndex
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-center">{step}</span>
              </div>
              {index < statusSteps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    index < currentStepIndex ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-10 p-4 rounded-md bg-red-100 text-red-700">
          This order was cancelled.
        </div>
      )}

      {/* Tracking Info */}
      {order.trackingNumber && (
        <div className="mb-8 p-6 rounded-lg border border-gray-200 dark:border-gray-900">
          <h2 className="text-lg font-bold mb-2">Tracking Information</h2>
          <p className="text-sm">
            <span className="text-gray-500">Courier: </span>
            {order.courierName}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Tracking Number: </span>
            {order.trackingNumber}
          </p>
          {order.trackingUrl && (
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-sm"
            >
              Track Package
            </a>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold mb-2">Items</h2>
          {order.items.map((item) => (
            <div
              key={item.orderItemId}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-900"
            >
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  {item.productVariety}
                  {item.productSpecification ? `, ${item.productSpecification}` : ""} ·{" "}
                  {item.measurementUnit} × {item.quantity}
                </p>
                {order.status === "DELIVERED" && (
                  <button
                    onClick={() => setReviewingItem(item)}
                    className="text-sm text-primary-500 hover:underline mt-1 cursor-pointer"
                  >
                    Write a Review
                  </button>
                )}
              </div>
              <p className="font-semibold">₦{Number(item.subtotal).toFixed(2)}</p>
            </div>
          ))}

          {reviewingItem && (
            <ReviewForm
              isOpen={Boolean(reviewingItem)}
              onClose={() => setReviewingItem(null)}
              productId={reviewingItem.productId}
              orderId={order.orderId}
              productName={reviewingItem.productName}
            />
          )}
        </div>

        {/* Summary */}
        <div className="h-fit p-6 rounded-lg border border-gray-200 dark:border-gray-900 bg-neutral-100 dark:bg-neutral-950">
          <h2 className="text-lg font-bold mb-4">Summary</h2>
          <div className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>₦{Number(order.totalAmount).toFixed(2)}</span>
          </div>
          <p className="text-sm mb-1">
            <span className="text-gray-500">Payment: </span>
            {order.paymentMethod} — {order.paymentStatus}
          </p>
          {order.deliveryAddress && (
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
              <p className="text-sm font-medium mb-1">Delivering to:</p>
              <p className="text-sm text-gray-500">{order.deliveryAddress.streetAddress}</p>
              <p className="text-sm text-gray-500">
                {order.deliveryAddress.city}, {order.deliveryAddress.state}
              </p>
              <p className="text-sm text-gray-500">{order.deliveryAddress.phoneNumber}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}