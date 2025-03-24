import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeleteEvent({ user }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all events on page load
  useEffect(() => {
    axios
      .get("https://events-platform-iut7.onrender.com/api/events")
      .then((response) => {
        setEvents(response.data.events); // Ensure that the structure of your response contains 'events'
      })
      .catch((err) => {
        setError("Error fetching events.");
      });
  }, []);

  // Handle event deletion
  const handleDelete = (event_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      axios
        .delete(`https://events-platform-iut7.onrender.com/api/events/${event_id}`)
        .then(() => {
          // Remove the event from the list after deletion
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.event_id !== event_id)
          );
        })
        .catch((err) => {
          setError("Error deleting event.");
        });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      {/* List of Events */}
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.event_id} className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{new Date(event.date).toLocaleString()}</p>

              {/* Show delete button only for admin */}
              {user && user.is_admin && (
                <button
                  onClick={() => handleDelete(event.event_id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}
