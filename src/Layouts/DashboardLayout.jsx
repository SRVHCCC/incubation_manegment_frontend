import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Common/DashboardCommon/Sidebar";
import Header from "../Common/DashboardCommon/Header";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-4 bg-gray-100 flex-1 overflow-y-auto scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
