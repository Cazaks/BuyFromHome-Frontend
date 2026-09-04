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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
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
      return true;
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
      return false;
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
    <AuthContext.Provider value={{ user, message, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}