import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/api/users") // Fetch all users
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
          <label className="block text-gray-700">username:</label>
          <input
            type="username"
            className="w-full p-2 border rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
