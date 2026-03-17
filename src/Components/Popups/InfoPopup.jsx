import { X } from "lucide-react";
import React from "react";

const InfoPopup = ({ close }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl w-[95%] sm:w-[90%] md:w-175 lg:w-200 max-h-[90vh] overflow-y-auto shadow-xl hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 relative">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b flex items-center justify-center p-4 rounded-t-xl z-10">
        <h2 className="text-lg md:text-xl font-semibold text-blue-800">
          District Information
        </h2>

        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
        >
          <X className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">District Name</label>
          <input
            type="text"
            placeholder="Enter district name"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">State</label>
          <input
            type="text"
            placeholder="Enter state"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Population</label>
          <input
            type="number"
            placeholder="Enter population"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Area (sq km)</label>
          <input
            type="number"
            placeholder="Enter area"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">District GDP</label>
          <input
            type="number"
            placeholder="Enter GDP"
            min={0}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Per Capita Income</label>
          <input
            type="number"
            placeholder="Enter income"
            min={0}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Big Industries</label>
          <input
            type="text"
            placeholder="Example: Steel, Cement"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Micro Industries</label>
          <input
            type="text"
            placeholder="Small local industries"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Macro Industries</label>
          <input
            type="text"
            placeholder="Large scale industries"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Major Transport</label>
          <input
            type="text"
            placeholder="Road / Rail / Airport"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Notes / Additional Info</label>
          <textarea
            rows="3"
            placeholder="Any additional district information"
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="p-6 pt-0 flex justify-center">
        <button className="bg-blue-600 w-full md:w-[300px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;
