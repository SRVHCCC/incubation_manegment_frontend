/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Eye, EyeOff, GithubIcon, Loader, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../Common/config/config";
import { ErrorToast, SuccessToast } from "../../Common/Toasters/Toster";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    district: "",
    photo: null,
  });
  const navigate = useNavigate();

  const states = State.getStatesOfCountry("IN");

  const districts = form.state ? City.getCitiesOfState("IN", form.state) : [];

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim() || data.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Invalid email";
    }

    if (!data.password || data.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
    }

    if (!data.state) {
      newErrors.state = "State is required";
    }

    if (!data.district) {
      newErrors.district = "City is required";
    }

    setErrors(newErrors);
  };

  const debounceValidate = (data) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      validate(data);
    }, 500);
    setDebounceTimer(timer);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);
    debounceValidate(updated);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    // console.log("$file", file);
    const updated = { ...form, photo: file };
    setForm(updated);
    debounceValidate(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(form);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("in_password", form.password);
      formData.append("state", form.state);
      formData.append("district", form.district);
      formData.append("photo", form.photo);
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
      // console.log("Response after signup", response.data);
      if (response.data.success) {
        SuccessToast({ content: "Signup successful !" });
        setForm({
          name: "",
          email: "",
          password: "",
          state: "",
          district: "",
          photo: null,
        });
      }
      SuccessToast({ content: "Login successful" });
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userData", response.data.user_data);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      // console.log("Something went wrong !", error);
      ErrorToast("Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-8 bg-[#1c2331]/50 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-2xl hover:shadow-md hover:shadow-white/10 transition-all"
      >
        <div className="text-center">
          <h2 className="text-4xl font-black text-white">Create Account</h2>
          <p className="mt-3 text-slate-400">Sign up to continue</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="md:flex space-y-4 lg:space-x-0 items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full text-white py-4 px-5 rounded-xl bg-[#2a3447]/50 border border-white/10"
            />

            {form.photo && (
              <img
                src={URL.createObjectURL(form.photo)}
                className="h-16 w-16 object-cover rounded-full border border-white/10"
              />
            )}
          </div>

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white placeholder-slate-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white"
            >
              <option value="" hidden>
                Select State
              </option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-400 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-[#2a3447]/50 border border-white/10 rounded-xl text-white"
            >
              <option value="" hidden>
                Select City
              </option>
              {districts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-400 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            {!loading ? (
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
              >
                Sign Up
              </button>
            ) : (
              <div className="w-full py-4 cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex justify-center">
                <Loader className="spin" />
              </div>
            )}
          </div>
        </form>

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-indigo-400 font-bold cursor-pointer"
          >
            Login
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

export default SignUp;
