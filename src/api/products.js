const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}