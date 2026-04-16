import React, { useState } from "react";
import { login, signup, guestLogin } from "../services/authService";

const AuthForm = () => {
  const [mode, setMode] = useState("login"); // 🔥 internal toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      let res;

      if (isLogin) {
        res = await login({ email, password });
      } else {
        res = await signup({ email, password });
      }

      localStorage.setItem("access", res.access);
      console.log(res);
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    try {
      setLoading(true);
      const res = await guestLogin();
      localStorage.setItem("access", res.access);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    alert("Google login coming soon 🚀");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl">

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>

        {/* GOOGLE */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-black transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* PRIMARY BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Sign in with Email"
            : "Sign up with Email"}
        </button>

        {/* 🔥 TOGGLE LOGIN/SIGNUP */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="ml-1 text-black font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>

        {/* GUEST */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Just exploring?
        </p>

        <button
          onClick={handleGuest}
          className="w-full mt-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Continue as Guest →
        </button>
      </div>
    </div>
  );
};

export default AuthForm;