import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { createProductOption, updateProductOption, fetchProductOptionById } from "../api/productOptions";
import { fetchProducts } from "../api/products";
import FormField from "../components/FormField";

export default function CreateProductOption() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdateMode = Boolean(id);

  const [products, setProducts] = useState([]);
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
    fetchProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (isUpdateMode) {
      fetchProductOptionById(id)
        .then((option) => {
          reset({
            productId: option.productId,
            productVariety: option.productVariety,
            productSpecification: option.productSpecification,
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
      productId: Number(data.productId),
      productVariety: data.productVariety,
      productSpecification: data.productSpecification,
    };
    try {
      if (isUpdateMode) {
        await updateProductOption(id, payload, user.token);
      } else {
        await createProductOption(payload, user.token);
      }
      navigate("/admin/product-options");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{isUpdateMode ? "Update Product Option" : "Add Product Option"}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
      >
        {serverError && (
          <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">{serverError}</div>
        )}

        <div className="mb-4">
          <label htmlFor="productId" className="block mb-2 text-sm font-medium">
            Product
          </label>
          <select
            id="productId"
            className="block text-sm w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
            {...register("productId", { required: "Product is required" })}
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.productId} value={p.productId}>
                {p.productName}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="text-red-500 text-sm mt-1">{errors.productId.message}</p>
          )}
        </div>

        <FormField
          label="Variety"
          id="productVariety"
          placeholder="e.g. Local Rice"
          error={errors.productVariety?.message}
          registration={register("productVariety")}
        />

        <FormField
          label="Specification"
          id="productSpecification"
          placeholder="e.g. Short grain"
          error={errors.productSpecification?.message}
          registration={register("productSpecification")}
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Saving..." : isUpdateMode ? "Update Option" : "Create Option"}
        </button>
      </form>
    </div>
  );
}