const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchSellingMeasurementsByOption(productOptionId) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/product-option/${productOptionId}`);
  if (!response.ok) throw new Error(`Failed to fetch selling measurements: ${response.status}`);
  return response.json();
}

export async function fetchAllSellingMeasurements() {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements`);
  if (!response.ok) throw new Error(`Failed to fetch selling measurements: ${response.status}`);
  return response.json();
}

export async function fetchSellingMeasurementById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch selling measurement: ${response.status}`);
  return response.json();
}

export async function createSellingMeasurement(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create selling measurement");
  return result;
}

export async function updateSellingMeasurement(id, data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update selling measurement");
  return result;
}

export async function disableSellingMeasurement(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/${id}/disable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to disable selling measurement");
  return result;
}

export async function enableSellingMeasurement(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/selling-measurements/${id}/enable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to enable selling measurement");
  return result;
}