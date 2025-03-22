import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      name,
      email,
    };
    console.log(newUser);
    axios
      .post("/api/users", newUser)
      .then((res) => {
        setUser(res.data.user);
        navigate("/");
      })
      .catch(() => {
        setError("Signup failed!");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
