import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import { useAuth } from "../context/useAuth";

export default function ForgotPassword() {
  const { forgotPassword, message } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    const success = await forgotPassword(data.email);
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <div className="max-w-md mx-auto p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950">
        <h2 className="text-3xl font-bold mb-4 text-center">Forgot Password</h2>

        {submitted ? (
          <div className="text-center">
            <p className="mb-6">
              If an account exists with that email, we've sent a link to reset your password.
            </p>
            <Link to="/auth" className="text-primary-500 hover:underline">
              Back to Log In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {message.content && (
              <div className={`mb-6 p-4 rounded-md ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {message.content}
              </div>
            )}

            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <FormField
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              registration={register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
              })}
            />

            <button
              type="submit"
              disabled={submitting}
              className="block mx-auto bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              <Link to="/auth" className="text-primary-500 hover:underline">
                Back to Log In
              </Link>
            </p>
          </form>
        )}
      </div>
    </Container>
  );
}