import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import React from "react";
import Footer from "../Common/Footer";

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-white overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
