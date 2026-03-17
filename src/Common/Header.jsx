import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const detectScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", detectScroll);
    return () => window.removeEventListener("scroll", detectScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`${scrolled ? "sticky top-2 z-20" : "bg-white shadow-md w-full"}`}
      >
        <div
          className={`mx-auto flex items-center justify-between px-4 transition-all duration-300 ease-in-out ${
            scrolled
              ? "max-w-7xl py-2 px-5 bg-white/10 text-gray-50 backdrop-blur-lg shadow-2xl rounded-full"
              : "max-w-7xl py-4"
          }`}
        >
          <div>
            <img alt="logo" src="/assets/logo.png" className="h-10" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to={"/"}
              className={`relative ${scrolled ? "text-white" : "text-gray-700"} hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            >
              Home
            </Link>
            <a
              href="#"
              className={`relative ${scrolled ? "text-white" : "text-gray-700"} hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            >
              About
            </a>
            <a
              href="#"
              className={`relative ${scrolled ? "text-white" : "text-gray-700"} hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            >
              Services
            </a>
            <Link
              to={"/login"}
              className={`relative ${scrolled ? "text-white" : "text-gray-700"} hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            >
              Login
            </Link>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full bg-black/40 z-10 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      <div
        className={` md:hidden fixed top-0 right-0 h-full w-full bg-black/30 text-xl backdrop-blur-md z-20 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-2xl">
            <X size={20} color="white" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-6 px-6">
          <Link
            to={"/"}
            onClick={closeMenu}
            className="text-white hover:text-black"
          >
            Home
          </Link>
          <a
            href="#"
            onClick={closeMenu}
            className="text-white hover:text-black"
          >
            About
          </a>
          <a
            href="#"
            onClick={closeMenu}
            className="text-white hover:text-black"
          >
            Services
          </a>
          <Link
            to={"/login"}
            onClick={closeMenu}
            className="text-white hover:text-black"
          >
            Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
