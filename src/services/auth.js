import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    // Store token in local storage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (error) {
    throw error.response.data.message || "Server Error";
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
