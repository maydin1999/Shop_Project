import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5043/api", // API adresiniz
});

export default api;
