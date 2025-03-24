import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login request starts
    axios
      .get("https://events-platform-iut7.onrender.com/api/users")
      .then((res) => {
        const foundUser = res.data.users.find(
          (u) => u.email === email && u.username === username
        );
        if (foundUser) {
          setUser(foundUser);
          navigate("/");
        } else {
          setError("Invalid credentials, try again!");
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading text or spinner */}
        {loading ? (
          <p className="text-blue-600 text-center">Loading...</p> // Simple loading text
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </form>
      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
