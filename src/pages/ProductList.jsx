import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, disableProduct, enableProduct } from "../api/products";
import { useAuth } from "../context/useAuth";

export default function ProductList() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleEnabled = async (product) => {
    try {
      if (product.enabled) {
        await disableProduct(product.productId, user.token);
      } else {
        await enableProduct(product.productId, user.token);
      }
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to="/admin/products/new"
          className="bg-primary-500 text-white px-4 py-2 text-sm rounded hover:bg-primary-600 transition-colors duration-200"
        >
          Add Product
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
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.productId} className="border-b border-gray-200 dark:border-gray-900">
                  <td className="p-3">{p.productName}</td>
                  <td className="p-3">{p.productCategoryName}</td>
                  <td className="p-3">
                    <span className={p.enabled ? "text-green-600" : "text-red-500"}>
                      {p.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/admin/products/${p.productId}/update`} className="text-primary-500 hover:underline">
                      Update
                    </Link>
                    <button
                      onClick={() => toggleEnabled(p)}
                      className="text-primary-500 hover:underline cursor-pointer"
                    >
                      {p.enabled ? "Disable" : "Enable"}
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