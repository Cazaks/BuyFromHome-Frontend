import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import { useAuth } from "../context/useAuth";
import { createProduct, updateProduct, fetchProductById } from "../api/products";
import { fetchCategories } from "../api/categories";

export default function CreateProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdateMode = Boolean(id);

  const [categories, setCategories] = useState([]);
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
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (isUpdateMode) {
      fetchProductById(id)
        .then((product) => {
          reset({
            productName: product.productName,
            productDescription: product.productDescription,
            imageUrl: product.imageUrl,
            productCategoryId: product.productCategoryId,
          });
        })
        .catch((err) => setServerError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isUpdateMode, reset]);

  if (!user || user.role !== "ADMIN") {
    return (
      <Container className="text-center py-20 text-gray-900 dark:text-gray-50">
        <h1 className="text-2xl font-bold">You don't have access to this page.</h1>
      </Container>
    );
  }

  if (loading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    setServerError("");
    setSubmitting(true);
    const payload = {
      productName: data.productName,
      productDescription: data.productDescription,
      imageUrl: data.imageUrl,
      productCategoryId: Number(data.productCategoryId),
    };
    try {
      if (isUpdateMode) {
        await updateProduct(id, payload, user.token);
      } else {
        await createProduct(payload, user.token);
      }
      navigate("/admin/products");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{isUpdateMode ? "Update Product" : "Add Product"}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
      >
        {serverError && (
          <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">{serverError}</div>
        )}

        <FormField
          label="Product Name"
          id="productName"
          placeholder="e.g. Rice"
          error={errors.productName?.message}
          registration={register("productName", { required: "Product name is required" })}
        />

        <FormField
          label="Description"
          id="productDescription"
          type="textarea"
          placeholder="Product description"
          error={errors.productDescription?.message}
          registration={register("productDescription", { required: "Description is required" })}
        />

        <FormField
          label="Image URL"
          id="imageUrl"
          placeholder="https://images.unsplash.com/..."
          error={errors.imageUrl?.message}
          registration={register("imageUrl")}
        />

        <div className="mb-4">
          <label htmlFor="productCategoryId" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <select
            id="productCategoryId"
            className="block text-sm w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-0 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white dark:bg-neutral-900"
            {...register("productCategoryId", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          {errors.productCategoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.productCategoryId.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Saving..." : isUpdateMode ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}