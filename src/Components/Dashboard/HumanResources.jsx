/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import API_URL from "../../Common/config/config";
import { ErrorToast, SuccessToast } from "../../Common/Toasters/Toster";
import { Download, Eye, FilePlus, Search, Upload, X } from "lucide-react";

const UploadPopUp = ({ close, user }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  console.log("$$$ user", user.user);
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
      if (!user.user._id || !file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("user_excel_file", file);
      formData.append("user_id", user.user._id);

      await axios.post(`${API_URL}/work-force/read-user-excel`, formData, {
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
        className="relative w-full max-w-md flex flex-col items-center gap-4 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-3 right-3">
          <X className="h-7 w-7 text-gray-700 hover:bg-gray-200 rounded-full p-1 transition-all" />
        </button>

        <label
          htmlFor="excel_file"
          className="flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-8 py-10 bg-gray-50 hover:bg-gray-100 transition w-full"
        >
          <FilePlus size={48} className="text-indigo-600" />
          <span className="text-base font-semibold text-gray-800">
            Upload Excel File
          </span>
          <span className="text-sm text-gray-500">.xlsx, .xls, .csv only</span>
        </label>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          id="excel_file"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && (
          <p className="text-red-600 text-sm text-center w-full">{error}</p>
        )}

        {file && (
          <div className="w-full flex flex-col gap-4">
            <div className="text-sm text-gray-700 truncate bg-gray-100 p-2 rounded">
              {file.name}
            </div>

            {uploading && (
              <div className="w-full">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-600">
                  {progress}%
                </p>
              </div>
            )}

            <button
              onClick={onSubmit}
              disabled={uploading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition w-full font-medium"
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// const usersData = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul@gmail.com",
//     education: "B.Tech",
//     city: "Delhi",
//   },
//   {
//     id: 2,
//     name: "Priya Singh",
//     email: "priya@gmail.com",
//     education: "MBA",
//     city: "Mumbai",
//   },
//   {
//     id: 3,
//     name: "Amit Verma",
//     email: "amit@gmail.com",
//     education: "B.Sc",
//     city: "Bhopal",
//   },
//   {
//     id: 4,
//     name: "Sneha Patel",
//     email: "sneha@gmail.com",
//     education: "M.Tech",
//     city: "Ahmedabad",
//   },
//   {
//     id: 5,
//     name: "Karan Mehta",
//     email: "karan@gmail.com",
//     education: "BCA",
//     city: "Indore",
//   },
//   {
//     id: 6,
//     name: "Anjali Gupta",
//     email: "anjali@gmail.com",
//     education: "MBA",
//     city: "Pune",
//   },
//   {
//     id: 7,
//     name: "Vikram Joshi",
//     email: "vikram.j@gmail.com",
//     education: "B.Tech",
//     city: "Bangalore",
//   },
//   {
//     id: 8,
//     name: "Neha Kapoor",
//     email: "neha.k@gmail.com",
//     education: "M.Sc",
//     city: "Chennai",
//   },
//   {
//     id: 9,
//     name: "Rohan Desai",
//     email: "rohan.d@gmail.com",
//     education: "BBA",
//     city: "Hyderabad",
//   },
//   {
//     id: 10,
//     name: "Shreya Iyer",
//     email: "shreya.i@gmail.com",
//     education: "B.Tech",
//     city: "Kolkata",
//   },
//   {
//     id: 11,
//     name: "Arjun Reddy",
//     email: "arjun.r@gmail.com",
//     education: "MBA",
//     city: "Jaipur",
//   },
//   {
//     id: 12,
//     name: "Meera Nair",
//     email: "meera.n@gmail.com",
//     education: "B.Com",
//     city: "Kochi",
//   },
// ];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [education, setEducation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axios.post(`${API_URL}/work-force/data`, {
        user_id: user._id,
      });
      if (response.data.success) setUsersData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user]);

  const educations = useMemo(() => {
    return [...new Set(usersData.map((u) => u.education))];
  }, [usersData]);

  const filteredUsers = useMemo(() => {
    return usersData.filter((u) => {
      const matchSearch =
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());
      const matchEducation = education === "All" || u.education === education;
      return matchSearch && matchEducation;
    });
  }, [search, education, usersData]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDownloadSample = async () => {
    try {
      const response = await axios.get(`${API_URL}/work-force/download`);
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full sm:w-80 lg:w-96 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-[160px]"
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Education</option>
              {educations.map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>

            <button
              onClick={handleDownloadSample}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2.5 rounded-lg transition font-medium shadow-sm"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download Sample</span>
            </button>

            <button
              onClick={() => setShowUploadPopUp(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2.5 rounded-lg transition font-medium shadow-sm"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Upload Excel</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="hidden md:grid md:grid-cols-5 bg-gray-100 px-6 py-3 font-semibold text-gray-700 border-b">
            <div>Name</div>
            <div>Email</div>
            <div>Education</div>
            <div>City</div>
            <div>Interested</div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="md:hidden font-semibold text-gray-800">
                    Name:
                  </div>
                  <div>{user.name}</div>

                  <div className="md:hidden font-semibold text-gray-800">
                    Email:
                  </div>
                  <div className="text-gray-600">{user.email}</div>

                  <div className="md:hidden font-semibold text-gray-800">
                    Education:
                  </div>
                  <div>{user.education}</div>

                  <div className="md:hidden font-semibold text-gray-800">
                    City:
                  </div>
                  <div>{user.location || "N/A"}</div>
                  <div className="md:hidden font-semibold text-gray-800">
                    interested:
                  </div>
                  <div>{user.interested}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No users found matching your criteria
              </div>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showUploadPopUp && (
        <UploadPopUp close={() => setShowUploadPopUp(false)} user={{ user }} />
      )}
    </div>
  );
}
