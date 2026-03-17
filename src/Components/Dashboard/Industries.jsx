/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Download, Eye, FilePlus, Search, Upload, X } from "lucide-react";
import StartupPopup from "../Popups/StartupPopup";
import axios from "axios";
import API_URL from "../../Common/config/config";
import { ErrorToast, SuccessToast } from "../../Common/Toasters/Toster";

const UploadPopUp = ({ close, user }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ["xlsx", "xls", "csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setError("Only .xlsx, .xls, .csv files are allowed");
      e.target.value = "";
      return;
    }

    setFile(file);
    setError("");
    setProgress(0);
  };

  const onSubmit = async () => {
    try {
      if (!user?._id || !file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("excel_file", file);
      formData.append("user_id", user._id);

      await axios.post(`${API_URL}/excel/read-excel`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(percent);
        },
      });
      SuccessToast("Data uploaded successfully");
      setUploading(false);
      close();
      setFile(null);
      setProgress(0);
    } catch (error) {
      // console.log("⚠️ Something went wrong!", error.response);
      // if(error.response.status)
      if (error.response.status === 409) {
        ErrorToast({ content: "Excel file contains duplicate entries!" });
        close();
        return;
      } else if (error.response.status === 400) {
        ErrorToast({ content: "Something went wrong!" });
        close();
        return;
      }
      close();
      setUploading(false);
      return;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md flex flex-col items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-2 right-2">
          <X className="h-7 w-7 text-black hover:bg-gray-200 rounded-full p-1 transition-all" />
        </button>

        <label
          htmlFor="excel_file"
          className="flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-6 py-8 bg-gray-50 transition w-full"
        >
          <FilePlus size={40} className="text-black" />
          <span className="text-sm font-semibold text-black">
            Upload Excel File
          </span>
          <span className="text-xs text-black">(.xlsx, .xls, .csv)</span>
        </label>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          id="excel_file"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && (
          <p className="text-red-500 text-xs text-center w-full">{error}</p>
        )}

        {file && (
          <div className="w-full flex flex-col gap-3">
            <p className="text-xs text-gray-600 truncate">{file.name}</p>

            {uploading && (
              <div className="w-full">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-3 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-right mt-1">{progress}%</p>
              </div>
            )}

            <button
              onClick={onSubmit}
              disabled={uploading}
              className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 disabled:opacity-50 w-full"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Industries = () => {
  const [user, setUser] = useState(null);
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchStartups = async () => {
      if (!user) return;

      try {
        const res = await axios.post(`${API_URL}/startup/data`, {
          user_id: user._id,
        });

        if (res.data.success) {
          setStartups(res.data.data);
        }
      } catch (error) {
        console.log(error);
        ErrorToast("Something went wrong!");
        return;
      }
    };

    fetchStartups();
  }, [user]);

  const filteredStartups = startups.filter((item) => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.o_email.toLowerCase().includes(search.toLowerCase()) ||
        item.sector.toLowerCase().includes(search.toLowerCase())) &&
      (sectorFilter === "" || item.sector === sectorFilter) &&
      (typeFilter === "" || item.type === typeFilter)
    );
  });

  const HandleDownload = async () => {
    try {
      const response = await axios.get(`${API_URL}/excel/download`);

      if (response.data.success) {
        const data = response.data.file_blob;

        const byteCharacters = atob(data);
        const byteNumber = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumber[i] = byteCharacters.charCodeAt(i);
        }

        const byte = new Uint8Array(byteNumber);

        const blob = new Blob([byte], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = response.data.file_name;

        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Startup Industries</h1>

        <div className="flex flex-wrap gap-2">
          {/* SEARCH */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-black/50 rounded-lg h-8 pl-8 pr-2 w-40 md:w-50"
              placeholder="Search..."
            />
            <Search
              size={18}
              className="absolute left-2 top-4 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* FILTERS */}

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="border border-black/50 rounded-lg h-8 px-2"
          >
            <option value="">All Sector</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Fintech">Fintech</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-black/50 rounded-lg h-8 px-2"
          >
            <option value="">All Type</option>
            <option value="Micro">Micro</option>
            <option value="Macro">Macro</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>

          <button
            onClick={HandleDownload}
            className="bg-green-600 hover:bg-green-700 flex w-50  items-center rounded-lg gap-1 md:gap-0 md:w-8 h-8 justify-center"
            title="Download sample excel"
          >
            <Download color="white" size={18} />{" "}
            <span className="md:hidden text-white">Download sample excel</span>
          </button>

          <button
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center rounded-lg gap-3 md:gap-0 w-50 md:w-8 h-8 justify-center"
            onClick={() => setShowUploadPopUp(true)}
            title="Upload Excel"
          >
            <Upload color="white" size={18} />
            <span className="md:hidden text-white">Upload excel</span>
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Sector</th>
              <th className="p-3">Type</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStartups.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.sector}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.o_email}</td>

                <td className="p-3">
                  <button
                    onClick={() => setSelectedStartup(item)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}

      <div className="md:hidden space-y-3">
        {filteredStartups.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
          >
            <div className="font-semibold text-lg">{item.name}</div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Sector:</span> {item.sector}
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {item.type}
            </div>

            <div className="text-sm text-gray-600 break-all">
              <span className="font-medium">Email:</span> {item.o_email}
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={() => setSelectedStartup(item)}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStartup && (
        <StartupPopup
          data={selectedStartup}
          close={() => setSelectedStartup(null)}
        />
      )}

      {showUploadPopUp && (
        <UploadPopUp close={() => setShowUploadPopUp(false)} user={user} />
      )}
    </div>
  );
};

export default Industries;
