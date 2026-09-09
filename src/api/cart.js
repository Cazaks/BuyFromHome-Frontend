const BASE_URL = import.meta.env.VITE_API_URL;

export async function addItemToBackendCart(sellingMeasurementId, quantity, token) {
  const response = await fetch(`${BASE_URL}/api/v1/carts/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ sellingMeasurementId, quantity }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to sync cart item");
  return result;
}