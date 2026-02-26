import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          LMS
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/instructor" className="hover:text-gray-200">Instructor</Link>
          <Link to="/admin" className="hover:text-gray-200">Admin</Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}