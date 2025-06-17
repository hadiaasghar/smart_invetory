import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaTasks,
  FaTruck,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { logout } from "../../services/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("isCollapsed")) || false
  );

  // Update localStorage when isCollapsed changes
  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <aside
      className={`bg-gray-900 text-white ${
        isCollapsed ? "w-20" : "w-64"
      } h-screen p-4 flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <span className="text-2xl font-bold">Smart Inventory</span>
          )}
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaHome />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaBox />
            {!isCollapsed && <span>Inventory</span>}
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaClipboardList />
            {!isCollapsed && <span>Orders</span>}
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaTasks />
            {!isCollapsed && <span>Task Reminder</span>}
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaTruck />
            {!isCollapsed && <span>Suppliers</span>}
          </NavLink>
        </nav>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 p-2 rounded hover:bg-red-600 bg-red-500 mt-4"
      >
        <FaSignOutAlt />
        {!isCollapsed && <span>Logout</span>}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl mb-4">Confirm Logout</h3>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
