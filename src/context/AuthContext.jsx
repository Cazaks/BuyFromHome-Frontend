import { createContext, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || null;
    } catch {
      return null;
    }
  });

  const [message, setMessage] = useState({ content: "", type: "" });

  async function parseResponse(response) {
    const contentType = response.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      throw new Error((data && data.message) || "Something went wrong");
    }
    return data;
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(response);
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      setMessage({ content: "", type: "" });
      return data;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return null;
    }
  };

  const signup = async ({ firstName, lastName, email, password, phoneNumber }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber }),
      });
      const data = await parseResponse(response);
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      setMessage({ content: "", type: "" });
      return data;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return null;
    }
  };

  const loginWithGoogle = async (idToken) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await parseResponse(response);
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      setMessage({ content: "", type: "" });
      return data;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return null;
    }
  };

  const signupWithGoogle = async (idToken) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await parseResponse(response);
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      setMessage({ content: "", type: "" });
      return data;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return null;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await parseResponse(response);
      setMessage({ content: "", type: "" });
      return true;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return false;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      await parseResponse(response);
      setMessage({ content: "", type: "" });
      return true;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    setMessage({ content: "", type: "" });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        message,
        login,
        signup,
        loginWithGoogle,
        signupWithGoogle,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}