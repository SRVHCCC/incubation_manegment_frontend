import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Layout from "./Layouts/Layout";
import DashboardLayout from "./Layouts/DashboardLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./Auth/ProtectedRoutes";

const HeroPage = lazy(() => import("./Components/Pages/HeroPage"));
const Login = lazy(() => import("./Components/Auth/Login"));
const SignupPage = lazy(() => import("./Components/Auth/Signup"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const Industries = lazy(() => import("./Components/Dashboard/Industries"));
const HumanResources = lazy(() => import("./Components/Dashboard/HumanResources"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Loading...</span>
            </div>
          </div>
        }
      >
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HeroPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to={"/"} replace={true} />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="industries" element={<Industries />} />
              <Route path="human_resources" element={<HumanResources />} />
              <Route
                path="*"
                element={<Navigate to={"/dashboard"} replace={true} />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
