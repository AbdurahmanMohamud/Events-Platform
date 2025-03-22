import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4 text-white shadow-md">
      <div>
        <Link to="/" className="font-bold text-2xl hover:text-gray-300 transition duration-200">
          Events Platform
        </Link>
      </div>
      <div className="space-x-6 flex items-center">
        {user ? (
          <>
            <span className="text-lg">Welcome, {user.username}!</span>
            {/* Add Event button (Admin only) */}
            {user.is_admin && (
              <Link
                to="/add-event"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Add Event
              </Link>
            )}
            {/* Delete Event button (Admin only) */}
            {user.is_admin && (
              <Link
                to="/delete-event"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete Events
              </Link>
            )}
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
