import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllSellingMeasurements, disableSellingMeasurement, enableSellingMeasurement } from "../api/sellingMeasurements";
import { measurementUnitLabels } from "../components/measurementUnitLabels";
import { useAuth } from "../context/useAuth";

export default function SellingMeasurementList() {
  const { user } = useAuth();
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetchAllSellingMeasurements()
      .then(setMeasurements)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleEnabled = async (m) => {
    try {
      if (m.enabled) {
        await disableSellingMeasurement(m.sellingMeasurementId, user.token);
      } else {
        await enableSellingMeasurement(m.sellingMeasurementId, user.token);
      }
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Selling Measurements</h2>
        <Link
          to="/admin/selling-measurements/new"
          className="bg-primary-500 text-white px-4 py-2 text-sm rounded hover:bg-primary-600 transition-colors duration-200"
        >
          Add Measurement
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
                <th className="p-3">Unit</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m) => (
                <tr key={m.sellingMeasurementId} className="border-b border-gray-200 dark:border-gray-900">
                  <td className="p-3">{m.productName}</td>
                  <td className="p-3">{m.productVariety}</td>
                  <td className="p-3">{measurementUnitLabels[m.measurementUnit]}</td>
                  <td className="p-3">₦{m.sellingPrice}</td>
                  <td className="p-3">{m.quantityInStock}</td>
                  <td className="p-3">
                    <span className={m.enabled ? "text-green-600" : "text-red-500"}>
                      {m.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/admin/selling-measurements/${m.sellingMeasurementId}/update`} className="text-primary-500 hover:underline">
                      Update
                    </Link>
                    <button
                      onClick={() => toggleEnabled(m)}
                      className="text-primary-500 hover:underline cursor-pointer"
                    >
                      {m.enabled ? "Disable" : "Enable"}
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