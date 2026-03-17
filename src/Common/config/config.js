const API_URL =
  import.meta.env.VITE_MODE === "local" ? "http://localhost:5000/api" : "https://incubation-manegment-backend.onrender.com/api";

export default API_URL;
