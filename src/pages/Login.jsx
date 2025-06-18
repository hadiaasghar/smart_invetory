import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful");
      // Add a short delay before navigating
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-[#F1F5F6] bg-center"
      
    >
      <ToastContainer />
      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Smart Inventory System
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
