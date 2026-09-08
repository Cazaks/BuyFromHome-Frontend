const BASE_URL = import.meta.env.VITE_API_URL;

export async function createOrder(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create order");
  return result;
}

export async function fetchMyOrders(token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);
  return response.json();
}

export async function fetchMyOrderById(orderId, token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch order: ${response.status}`);
  return response.json();
}

export async function fetchAllOrdersAdmin(token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);
  return response.json();
}

export async function fetchOrderByIdAdmin(orderId, token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/admin/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch order: ${response.status}`);
  return response.json();
}

export async function updateOrderStatus(orderId, status, token) {
  const response = await fetch(
    `${BASE_URL}/api/v1/orders/admin/${orderId}/status?status=${status}`,
    { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update order status");
  return result;
}

export async function updatePaymentStatus(orderId, paymentStatus, token) {
  const response = await fetch(
    `${BASE_URL}/api/v1/orders/admin/${orderId}/payment-status?paymentStatus=${paymentStatus}`,
    { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update payment status");
  return result;
}

export async function updateOrderTracking(orderId, data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/admin/${orderId}/tracking`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update tracking");
  return result;
}