import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function GoogleSignInButton({ mode }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { loginWithGoogle, signupWithGoogle } = useAuth();

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const idToken = response.credential;
        const result =
          mode === "signup"
            ? await signupWithGoogle(idToken)
            : await loginWithGoogle(idToken);

        if (result) {
          navigate(result.role === "ADMIN" ? "/admin" : "/");
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: 320,
      text: mode === "signup" ? "signup_with" : "signin_with",
    });
  }, [mode, loginWithGoogle, signupWithGoogle, navigate]);

  return <div ref={buttonRef} className="flex justify-center my-4" />;
}