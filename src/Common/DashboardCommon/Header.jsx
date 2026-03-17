import {
  BellDot,
  HelpingHand,
  Menu,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileOptions = [
    { title: "Profile", icon: <User size={16} /> },
    { title: "Settings", icon: <Settings size={16} /> },
    { title: "Notifications", icon: <BellDot size={16} /> },
    { title: "Help", icon: <HelpingHand size={16} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white shadow">
      <button onClick={toggleSidebar} className="cursor-pointer">
        <Menu size={24} />
      </button>

      <div className="relative" ref={dropdownRef}>
        <div
          className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center hover:bg-gray-300 transition cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <User size={18} />
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-10">
            {profileOptions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}

            <div className="border-t my-1 mx-2"></div>

            <div className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition">
              <LogOut size={16} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
