import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <FaUserCircle size={28} className="text-gray-700" />
        <span className="text-gray-800">Admin</span>
      </div>
    </header>
  );
};

export default Header;
