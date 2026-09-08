const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchMyAddresses(token) {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Failed to fetch addresses: ${response.status}`);
  return response.json();
}

export async function createAddress(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create address");
  return result;
}

export async function setDefaultAddress(addressId, token) {
  const response = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}/set-default`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to set default address");
  return result;
}