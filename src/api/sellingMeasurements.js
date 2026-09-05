const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchSellingMeasurementsByOption(productOptionId) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/product-option/${productOptionId}`);
  if (!response.ok) throw new Error(`Failed to fetch selling measurements: ${response.status}`);
  return response.json();
}