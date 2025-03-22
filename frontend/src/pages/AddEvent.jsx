import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", event);
      const newEvent = response.data;  // The full event object returned from the backend

      // Show the popup after event creation
      setShowPopup(true);

      // Redirect to the new event page after a short delay
      setTimeout(() => {
        navigate(`/`);
      }, 2000); // Redirect after 2 seconds to show the popup
    } catch (err) {
      setError("There was an error creating the event.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup manually
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Event Created!</h3>
            <p className="mt-2">Your event has been successfully created.</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-medium">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
