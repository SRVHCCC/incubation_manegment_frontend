import { ArrowUpCircleIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="">
            <img
              alt="logo"
              src="/assets/logo.png"
              className="h-20 mx-0 md:mx-20"
            />
            <p className="text-sm leading-relaxed">
              Building modern web applications with scalable architecture and
              beautiful user experiences.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Links</h2>
            <ul className="space-y-2">
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Home
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                About
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Services
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Resources</h2>
            <ul className="space-y-2">
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Blog
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Docs
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Support
              </li>
              <li className="hover:text-white hover:translate-x-3 cursor-pointer transition ease-in-out duration-300">
                Privacy
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Newsletter
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter email"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500 w-full"
              />
              <button className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </footer>

      {show && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition"
        >
          <ArrowUpCircleIcon size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
