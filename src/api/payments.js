const BASE_URL = import.meta.env.VITE_API_URL;

export async function createPayment(orderId, paymentMethod, token) {
  const response = await fetch(`${BASE_URL}/api/v1/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ orderId, paymentMethod }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create payment");
  return result;
}

export async function fetchMyPayments(token) {
  const response = await fetch(`${BASE_URL}/api/v1/payments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch payments: ${response.status}`);
  return response.json();
}

export async function markPaymentSuccessAdmin(paymentId, token) {
  const response = await fetch(`${BASE_URL}/api/v1/payments/admin/${paymentId}/mark-success`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to mark payment success");
  return result;
}