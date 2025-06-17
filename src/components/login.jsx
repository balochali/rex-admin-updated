/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { aptos } from "@/libs/fonts";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (formData.email === "" || formData.password === "") {
        setError("Email and password are required.");
      } else {
        const response = await login(formData.email, formData.password);
        if (response.success) {
          router.push("/"); // Redirect on successful login
        }
      }
    } catch (err) {
      setError("Error occurred during login. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <>
      <motion.div
        className="w-full flex place-content-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h2
            className={`text-center text-2xl font-bold text-gray-700 ${aptos.className}`}
          >
            Login
          </h2>
          <div className="mt-6 w-full">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${aptos.className} border border-black p-2 text-sm w-[25rem] rounded-xs`}
                placeholder="Email"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`${aptos.className} border border-black p-2 text-sm w-[25rem] rounded-xs`}
                placeholder="Password"
              />
            </div>
            <div className="mt-4">
              <p
                className={`${aptos.className} text-sm text-center transition-all duration-300 hover:tracking-wide cursor-pointer`}
              >
                Forgot your password?
              </p>
            </div>
            <div className="mt-4 flex place-content-center gap-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`${aptos.className} p-2 text-sm bg-black text-white rounded-xs w-28 cursor-pointer duration-300 hover:tracking-widest hover:font-medium`}
              >
                {loading ? (
                   <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-dashed border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                   >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                   </div>
                ) : (
                   "Sign in"
                )}

              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {error && (
        <motion.div
          className="-mt-8 flex place-content-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        </motion.div>
      )}

    </>
  )
};

export default Login;
