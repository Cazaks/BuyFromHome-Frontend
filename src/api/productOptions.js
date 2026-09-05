const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProductOptionsByProduct(productId) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/product/${productId}`);
  if (!response.ok) throw new Error(`Failed to fetch product options: ${response.status}`);
  return response.json();
}

export async function fetchAllProductOptions() {
  const response = await fetch(`${BASE_URL}/api/v1/product-options`);
  if (!response.ok) throw new Error(`Failed to fetch product options: ${response.status}`);
  return response.json();
}

export async function fetchProductOptionById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product option: ${response.status}`);
  return response.json();
}

export async function createProductOption(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create product option");
  return result;
}

export async function updateProductOption(id, data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update product option");
  return result;
}

export async function disableProductOption(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/${id}/disable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to disable product option");
  return result;
}

export async function enableProductOption(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/${id}/enable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to enable product option");
  return result;
}