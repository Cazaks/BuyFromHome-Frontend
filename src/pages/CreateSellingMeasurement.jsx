import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import {
  createSellingMeasurement,
  updateSellingMeasurement,
  fetchSellingMeasurementById,
} from "../api/sellingMeasurements";
import { fetchAllProductOptions } from "../api/productOptions";
import { measurementUnitLabels } from "../components/measurementUnitLabels";
import FormField from "../components/FormField";

export default function CreateSellingMeasurement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdateMode = Boolean(id);

  const [options, setOptions] = useState([]);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isUpdateMode);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAllProductOptions().then(setOptions).catch(() => setOptions([]));
  }, []);

  useEffect(() => {
    if (isUpdateMode) {
      fetchSellingMeasurementById(id)
        .then((m) => {
          reset({
            productOptionId: m.productOptionId,
            measurementUnit: m.measurementUnit,
            sellingPrice: m.sellingPrice,
            quantityInStock: m.quantityInStock,
          });
        })
        .catch((err) => setServerError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isUpdateMode, reset]);

  if (loading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    setServerError("");
    setSubmitting(true);
    const payload = {
      productOptionId: Number(data.productOptionId),
      measurementUnit: data.measurementUnit,
      sellingPrice: Number(data.sellingPrice),
      quantityInStock: Number(data.quantityInStock),
    };
    try {
      if (isUpdateMode) {
        await updateSellingMeasurement(id, payload, user.token);
      } else {
        await createSellingMeasurement(payload, user.token);
      }
      navigate("/admin/selling-measurements");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {isUpdateMode ? "Update Selling Measurement" : "Add Selling Measurement"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
      >
        {serverError && (
          <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">{serverError}</div>
        )}

        <div className="mb-4">
          <label htmlFor="productOptionId" className="block mb-2 text-sm font-medium">
            Product Option
          </label>
          <select
            id="productOptionId"
            className="block text-sm w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
            {...register("productOptionId", { required: "Product option is required" })}
          >
            <option value="">Select an option</option>
            {options.map((o) => (
              <option key={o.productOptionId} value={o.productOptionId}>
                {o.productName} - {o.productVariety}
                {o.productSpecification ? ` (${o.productSpecification})` : ""}
              </option>
            ))}
          </select>
          {errors.productOptionId && (
            <p className="text-red-500 text-sm mt-1">{errors.productOptionId.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="measurementUnit" className="block mb-2 text-sm font-medium">
            Measurement Unit
          </label>
          <select
            id="measurementUnit"
            className="block text-sm w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
            {...register("measurementUnit", { required: "Measurement unit is required" })}
          >
            <option value="">Select a unit</option>
            {Object.entries(measurementUnitLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.measurementUnit && (
            <p className="text-red-500 text-sm mt-1">{errors.measurementUnit.message}</p>
          )}
        </div>

        <FormField
          label="Selling Price (₦)"
          id="sellingPrice"
          type="number"
          placeholder="e.g. 2800"
          error={errors.sellingPrice?.message}
          registration={register("sellingPrice", {
            required: "Selling price is required",
            min: { value: 0.01, message: "Price must be greater than zero" },
          })}
        />

        <FormField
          label="Quantity in Stock"
          id="quantityInStock"
          type="number"
          placeholder="e.g. 50"
          error={errors.quantityInStock?.message}
          registration={register("quantityInStock", {
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be greater than zero" },
          })}
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Saving..." : isUpdateMode ? "Update Measurement" : "Create Measurement"}
        </button>
      </form>
    </div>
  );
}