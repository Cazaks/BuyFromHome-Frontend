import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { createCategory } from "../api/categories";
import FormField from "../components/FormField";

export default function CreateCategory() {
  const { user } = useAuth();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    setSuccess(false);
    setSubmitting(true);
    try {
      await createCategory(
        {
          categoryName: data.categoryName,
          categoryDescription: data.categoryDescription,
        },
        user.token
      );
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
      >
        {serverError && (
          <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">{serverError}</div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700">
            Category created successfully.
          </div>
        )}

        <FormField
          label="Category Name"
          id="categoryName"
          placeholder="e.g. Grains"
          error={errors.categoryName?.message}
          registration={register("categoryName", { required: "Category name is required" })}
        />

        <FormField
          label="Description"
          id="categoryDescription"
          type="textarea"
          placeholder="Category description"
          error={errors.categoryDescription?.message}
          registration={register("categoryDescription", { required: "Description is required" })}
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}