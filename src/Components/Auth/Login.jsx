/* eslint-disable no-unused-vars */
import { Eye, EyeOff, GithubIcon, Loader } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../Common/Toasters/Toster";
import axios from "axios";
import API_URL from "../../Common/config/config";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({
    email: "",
    in_password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, form);
      if (response.data.success) {
        const { token, user_data: user } = response.data;
        SuccessToast({ content: "Login successful" });
        if (rememberMe) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));
        }
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Something went wrong!", error);
      if (error.response) {
        ErrorToast({ content: error.response.data.message });
      } else {
        ErrorToast({ content: "Something went wrong!" });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 bg-[#1c2331]/50 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-2xl hover:shadow-md hover:shadow-white/10 transition-all ease-in-out"
      >
        <div className="text-center">
          <h2 className="text-4xl font-black text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-3 text-slate-400 font-medium">
            Please enter your details to sign in
          </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                onChange={handleChange}
                value={form.email}
                className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <input
                id="in_password"
                name="in_password"
                onChange={handleChange}
                value={form.in_password}
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
                className="h-4 w-4 bg-slate-800 border-white/10 rounded text-indigo-500 focus:ring-offset-[#1c2331] focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-slate-400 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {!loading ? (
            <button
              type="submit"
              className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transform transition-all active:scale-[0.98]"
            >
              Sign in
            </button>
          ) : (
            <div className="w-full py-4 px-4 bg-indigo-400 hover:bg-indigo-500 text-white font-bold flex justify-center rounded-xl shadow-lg shadow-indigo-500/20 transform transition-all active:scale-[0.98]">
              <Loader className="spin" />
            </div>
          )}
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="px-4 bg-transparent text-white z-5">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex justify-center items-center py-3 px-4 bg-white hover:bg-slate-100 rounded-xl transition-all duration-200 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#0f172b"
                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.1,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
              />
            </svg>
          </button>
          <button className="flex justify-center items-center py-3 px-4 bg-white hover:bg-slate-100 rounded-xl transition-all duration-200 group">
            <GithubIcon size={20} className="text-slate-900" />
          </button>
        </div>

        <p className="text-center text-white">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
      <style>{`
        .spin { 
          animation : loading 2s infinite linear
        }
          @keyframes loading {
            100%{
              transform : rotate(360deg)
            }
          }
      `}</style>
    </div>
  );
};

export default Login;
