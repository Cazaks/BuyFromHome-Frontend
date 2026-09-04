const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories`);
  if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
  return response.json();
}

export async function fetchCategoryById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch category: ${response.status}`);
  return response.json();
}

export async function createCategory(categoryData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create category");
  return data;
}

export async function updateCategory(id, categoryData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update category");
  return data;
}

export async function disableCategory(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories/${id}/disable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to disable category");
  return data;
}

export async function enableCategory(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories/${id}/enable`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to enable category");
  return data;
}