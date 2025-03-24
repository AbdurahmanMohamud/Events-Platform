import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = ({ user, setUser }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://events-platform-iut7.onrender.com/api/events")
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      {user && (
        <div className="flex justify-between items-center bg-green-100 p-4 rounded-xl shadow">
          <p className="text-green-800 font-semibold">
            Welcome, {user.name} 👋
          </p>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 underline"
          >
            Logout
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.event_id}
              className="p-4 border rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{truncateText(event.description, 100)}</p>
              <p>
                <strong>Date & Time:</strong> {formatDateTime(event.date)}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <Link
                to={`/events/${event.event_id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
