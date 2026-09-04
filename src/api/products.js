const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}

export async function createProduct(productData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }
  return data;
}