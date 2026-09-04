import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { fetchCategories } from "../api/categories";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => setProductCount(data.length)).catch(() => setProductCount(0));
    fetchCategories().then((data) => setCategoryCount(data.length)).catch(() => setCategoryCount(0));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-900 bg-neutral-100 dark:bg-neutral-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
          <p className="text-3xl font-bold mt-1">{productCount ?? "..."}</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-900 bg-neutral-100 dark:bg-neutral-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Categories</p>
          <p className="text-3xl font-bold mt-1">{categoryCount ?? "..."}</p>
        </div>
      </div>
    </div>
  );
}