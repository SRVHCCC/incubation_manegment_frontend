import React from "react";
import { X } from "lucide-react";

const StartupPopup = ({ data, close }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white w-[95%] md:w-125 rounded-xl shadow-xl p-6 relative">
        <button
          onClick={close}
          className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-4">{data.name}</h2>

        <div className="space-y-3">
          <p>
            <b>Sector:</b> {data.sector}
          </p>

          <p>
            <b>Type:</b> {data.type}
          </p>

          <p>
            <b>Founder:</b> {data.founder}
          </p>

          <p>
            <b>Email:</b> {data.o_email}
          </p>

          {/* <p>
            <b>Phone:</b> {data.phone}
          </p> */}

          <p>
            <b>Location:</b> {data.location}
          </p>

          <p>
            <b>Description:</b> {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartupPopup;
