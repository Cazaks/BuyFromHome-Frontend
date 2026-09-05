import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProductOptions, disableProductOption, enableProductOption } from "../api/productOptions";
import { useAuth } from "../context/useAuth";

export default function ProductOptionList() {
  const { user } = useAuth();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetchAllProductOptions()
      .then(setOptions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleEnabled = async (option) => {
    try {
      if (option.enabled) {
        await disableProductOption(option.productOptionId, user.token);
      } else {
        await enableProductOption(option.productOptionId, user.token);
      }
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Product Options</h2>
        <Link
          to="/admin/product-options/new"
          className="bg-primary-500 text-white px-4 py-2 text-sm rounded hover:bg-primary-600 transition-colors duration-200"
        >
          Add Option
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-900">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-100 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-900">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Variety</th>
                <th className="p-3">Specification</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {options.map((o) => (
                <tr key={o.productOptionId} className="border-b border-gray-200 dark:border-gray-900">
                  <td className="p-3">{o.productName}</td>
                  <td className="p-3">{o.productVariety}</td>
                  <td className="p-3">{o.productSpecification}</td>
                  <td className="p-3">
                    <span className={o.enabled ? "text-green-600" : "text-red-500"}>
                      {o.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/admin/product-options/${o.productOptionId}/update`} className="text-primary-500 hover:underline">
                      Update
                    </Link>
                    <button
                      onClick={() => toggleEnabled(o)}
                      className="text-primary-500 hover:underline cursor-pointer"
                    >
                      {o.enabled ? "Disable" : "Enable"}
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