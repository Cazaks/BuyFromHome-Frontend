import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, disableCategory, enableCategory } from "../api/categories";
import { useAuth } from "../context/useAuth";

export default function CategoryList() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleEnabled = async (category) => {
    try {
      if (category.enabled) {
        await disableCategory(category.id, user.token);
      } else {
        await enableCategory(category.id, user.token);
      }
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link
          to="/admin/categories/new"
          className="bg-primary-500 text-white px-4 py-2 text-sm rounded hover:bg-primary-600 transition-colors duration-200"
        >
          Add Category
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-900">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-100 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-900">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 dark:border-gray-900">
                  <td className="p-3">{c.categoryName}</td>
                  <td className="p-3">{c.categoryDescription}</td>
                  <td className="p-3">
                    <span className={c.enabled ? "text-green-600" : "text-red-500"}>
                      {c.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/admin/categories/${c.id}/update`} className="text-primary-500 hover:underline">
                      Update
                    </Link>
                    <button
                      onClick={() => toggleEnabled(c)}
                      className="text-primary-500 hover:underline cursor-pointer"
                    >
                      {c.enabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}