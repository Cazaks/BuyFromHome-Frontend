import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { fetchMyAddresses, createAddress } from "../api/addresses";
import { createOrder } from "../api/orders";
import { createPayment } from "../api/payments";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchMyAddresses(user.token)
      .then((data) => {
        setAddresses(data);
        const defaultAddr = data.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddressId(String(defaultAddr.id));
        else if (data.length === 0) setShowNewAddressForm(true);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.token]);

  const onAddAddress = async (data) => {
    try {
      const newAddress = await createAddress(
        { ...data, isDefault: addresses.length === 0 },
        user.token
      );
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(String(newAddress.id));
      setShowNewAddressForm(false);
      reset();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError("Please select or add a delivery address.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const order = await createOrder(
        {
          addressId: Number(selectedAddressId),
          paymentMethod,
          notes,
        },
        user.token
      );

      await createPayment(order.orderId, paymentMethod, user.token);

      clearCart();
      navigate(`/orders/${order.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Container className="py-20 text-center">Loading...</Container>;

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700 max-w-2xl">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Address */}
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-900">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

            {addresses.map((addr) => (
              <label
                key={addr.id}
                className="flex items-start gap-3 mb-3 p-3 border rounded-md cursor-pointer border-gray-200 dark:border-gray-800"
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddressId === String(addr.id)}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{addr.streetAddress}</p>
                  <p className="text-sm text-gray-500">
                    {addr.city}, {addr.state}, {addr.country}
                  </p>
                  <p className="text-sm text-gray-500">{addr.phoneNumber}</p>
                  {addr.landmark && (
                    <p className="text-sm text-gray-500">Landmark: {addr.landmark}</p>
                  )}
                </div>
              </label>
            ))}

            {!showNewAddressForm ? (
              <button
                onClick={() => setShowNewAddressForm(true)}
                className="text-primary-500 hover:underline text-sm cursor-pointer"
              >
                + Add a new address
              </button>
            ) : (
              <form onSubmit={handleSubmit(onAddAddress)} className="mt-4 border-t pt-4 border-gray-200 dark:border-gray-800">
                <FormField
                  label="Street Address"
                  id="streetAddress"
                  error={errors.streetAddress?.message}
                  registration={register("streetAddress", { required: "Street address is required" })}
                />
                <FormField
                  label="Phone Number"
                  id="phoneNumber"
                  error={errors.phoneNumber?.message}
                  registration={register("phoneNumber", { required: "Phone number is required" })}
                />
                <FormField
                  label="City"
                  id="city"
                  error={errors.city?.message}
                  registration={register("city", { required: "City is required" })}
                />
                <FormField
                  label="State"
                  id="state"
                  error={errors.state?.message}
                  registration={register("state", { required: "State is required" })}
                />
                <FormField
                  label="Country"
                  id="country"
                  error={errors.country?.message}
                  registration={register("country", { required: "Country is required" })}
                />
                <FormField
                  label="Landmark (optional)"
                  id="landmark"
                  registration={register("landmark")}
                />
                <button
                  type="submit"
                  className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            )}
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-900">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            {[
              { value: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
              { value: "BANK_TRANSFER", label: "Bank Transfer" },
              { value: "CARD", label: "Card (coming soon)" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 mb-3 p-3 border rounded-md cursor-pointer border-gray-200 dark:border-gray-800"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={option.value === "CARD"}
                />
                {option.label}
              </label>
            ))}
          </div>

          {/* Notes */}
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-900">
            <h2 className="text-xl font-bold mb-4">Order Notes (optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
              placeholder="e.g. Please call before delivery"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit p-6 rounded-lg border border-gray-200 dark:border-gray-900 bg-neutral-100 dark:bg-neutral-950">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={submitting || cartItems.length === 0}
            className="w-full mt-6 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </Container>
  );
}