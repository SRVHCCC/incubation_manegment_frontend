/* eslint-disable no-unused-vars */
import {
  Home,
  Users,
  Settings,
  LogOut,
  X,
  Factory,
  Users2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { title: "Home", icon: <Home size={20} />, path: "/dashboard" },
    { title: "Industry", icon: <Factory size={20} />, path: "/industries" },
    {
      title: "Human Resources",
      icon: <Users2 size={20} />,
      path: "/human_resources",
    },
  ];

  const handleLogout = () => {
    // console.log("Logout clicked");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed lg:static z-20 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}
      >
        <div>
          <div className="p-4 font-bold text-lg border-b flex items-center">
            {sidebarOpen ? (
              <div className="flex lg:block gap-25">
                <span>Dashboard</span>{" "}
                <button
                  className="lg:hidden cursor-pointer h-7 w-7 flex justify-center items-center rounded-full bg-gray-400"
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <span className="hidden lg:block">Dash</span>
            )}
          </div>

          <nav className="flex flex-col p-4 gap-3 relative">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  className="relative flex items-center gap-3 p-2 rounded-xl transition-all duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gray-200 rounded-xl"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}

                  <span className="relative z-10">{item.icon}</span>

                  <span
                    className={`relative z-10 ${
                      sidebarOpen ? "inline" : "hidden lg:hidden"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 hover:bg-red-100 text-red-600 rounded transition"
          >
            <LogOut size={20} />
            <span className={`${sidebarOpen ? "inline" : "hidden lg:hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
