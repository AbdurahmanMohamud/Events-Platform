import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <div>
        <Link to="/" className="font-bold text-xl">
          Events Platform
        </Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
