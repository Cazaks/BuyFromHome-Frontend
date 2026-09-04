const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`);
  if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);
  return response.json();
}

export async function createProduct(productData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create product");
  return data;
}

export async function updateProduct(id, productData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update product");
  return data;
}

export async function disableProduct(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}/disable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to disable product");
  return data;
}

export async function enableProduct(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}/enable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to enable product");
  return data;
}