const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProductOptionsByProduct(productId) {
  const response = await fetch(`${BASE_URL}/api/v1/product-options/product/${productId}`);
  if (!response.ok) throw new Error(`Failed to fetch product options: ${response.status}`);
  return response.json();
}