const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchReviewsForProduct(productId) {
  const response = await fetch(`${BASE_URL}/api/v1/reviews/product/${productId}`);
  if (!response.ok) throw new Error(`Failed to fetch reviews: ${response.status}`);
  return response.json();
}

export async function createReview(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to submit review");
  return result;
}