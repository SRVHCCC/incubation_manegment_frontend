const API_URL =
  import.meta.env.VITE_MODE === "local" ? "http://localhost:5000/api" : "";

export default API_URL;
