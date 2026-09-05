import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import { useAuth } from "../context/useAuth";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setServerError("");
    setSubmitting(true);
    const success = await resetPassword(token, data.newPassword);
    setSubmitting(false);
    if (success) {
      navigate("/auth");
    } else {
      setServerError("This reset link is invalid or has expired.");
    }
  };

  if (!token) {
    return (
      <Container as="section" className="py-20 text-center text-gray-900 dark:text-gray-50">
        <h2 className="text-2xl font-bold mb-4">Invalid Link</h2>
        <p className="mb-6">This password reset link is missing a token.</p>
        <Link to="/forgot-password" className="text-primary-500 hover:underline">
          Request a new link
        </Link>
      </Container>
    );
  }

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Reset Password</h2>

        {serverError && (
          <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">
            {serverError}{" "}
            <Link to="/forgot-password" className="underline">
              Request a new link
            </Link>
          </div>
        )}

        <FormField
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          error={errors.newPassword?.message}
          registration={register("newPassword", {
            required: "Password is required",
            pattern: {
              value: /^(?=\S+$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{9,}$/,
              message: "Min 9 chars, with uppercase, lowercase, digit, and special character",
            },
          })}
        />

        <FormField
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your new password"
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === newPassword || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          disabled={submitting}
          className="block mx-auto bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </Container>
  );
}