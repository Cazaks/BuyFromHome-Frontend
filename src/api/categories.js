const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
}

export async function createCategory(categoryData, token) {
  const response = await fetch(`${BASE_URL}/api/v1/product-categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create category");
  }
  return data;
}