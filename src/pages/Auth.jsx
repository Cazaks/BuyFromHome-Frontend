import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormField from "../components/FormField";
import GoogleSignInButton from "../components/GoogleSignInButton";
import ProductCarousel from "../components/ProductCarousel";
import { useAuth } from "../context/useAuth";
import authBackground from "../assets/images/authpage_Image.jpg";
import authFormBackground from "../assets/images/authform_Image.jpg";

export default function Auth() {
  const navigation = useNavigate();
  const [mode, setMode] = useState("login");
  const { user, login, signup, message } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let result;

    if (mode === "login") {
      result = await login(data.email, data.password);
    } else {
      result = await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });
    }

    if (result) {
      navigation(result.role === "ADMIN" ? "/admin" : "/");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — unchanged: background image + welcome + product carousel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${authBackground})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold text-white">
            BuyFromHome <span className="text-primary-400">Stores</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to BuyFromHome Stores
          </h1>
          <p className="text-white/80 mb-10 max-w-md">
            Discover the best products at unbeatable prices. Shop now and enjoy
            exclusive deals, delivered straight to your door.
          </p>
          <ProductCarousel />
        </div>
      </div>

      {/* Right panel — auth form, floating translucent over its own background image */}
<div
  className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-12 bg-cover bg-center"
  style={{ backgroundImage: `url(${authFormBackground})` }}
>
  <div className="absolute inset-0 bg-neutral-900/40" />

  <div className="relative z-10 w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/10">
    {user ? (
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName}!</h1>
        <p className="text-lg mb-6 text-white/80">
          You are now logged in. Enjoy shopping at BuyFromHome Stores.
        </p>
        <Link to="/" className="text-primary-400 hover:text-primary-300">
          Continue Shopping
        </Link>
      </div>
    ) : (
      <>
        <h2 className="text-3xl font-bold mb-2 text-white">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h2>
        <p className="text-white/70 mb-6">
          {mode === "login"
            ? "Welcome back — enter your details to continue."
            : "Create an account to start shopping."}
        </p>

        {message.content && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
          {mode === "signup" && (
            <>
              <FormField
                label="First Name"
                id="firstName"
                placeholder="Enter your first name"
                error={errors.firstName?.message}
                registration={register("firstName", { required: "First name is required" })}
              />
              <FormField
                label="Last Name"
                id="lastName"
                placeholder="Enter your last name"
                error={errors.lastName?.message}
                registration={register("lastName", { required: "Last name is required" })}
              />
              <FormField
                label="Phone Number"
                id="phoneNumber"
                placeholder="e.g. 08012345678"
                error={errors.phoneNumber?.message}
                registration={register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+234|0)[789][01]\d{8}$/,
                    message: "Enter a valid Nigerian phone number",
                  },
                })}
              />
            </>
          )}

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

          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            registration={register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=\S+$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{9,}$/,
                message: "Min 9 chars, with uppercase, lowercase, digit, and special character",
              },
            })}
          />

          {mode === "login" && (
            <p className="text-right mb-6 -mt-2">
              <Link to="/forgot-password" className="text-sm text-primary-400 hover:underline">
                Forgot password?
              </Link>
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-sm text-white/60">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>
          <GoogleSignInButton mode={mode} />
        </div>

        <p className="mt-6 text-center text-white/70">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-primary-400 cursor-pointer hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </>
    )}
  </div>
</div>
    </div>
  );
}