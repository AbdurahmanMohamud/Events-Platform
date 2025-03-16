import { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/events", form)
      .then(() => setMessage("Event created successfully!"))
      .catch(() => setMessage("Error creating event."));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 w-full"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
          type="submit"
        >
          Create
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
}
