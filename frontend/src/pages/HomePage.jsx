import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 space-y-4">
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
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date}
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
