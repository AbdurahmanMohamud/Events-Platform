import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetails() {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Temporary mock user (replace with real auth later)
  const user_id = 1;

  useEffect(() => {
    axios
      .get(`/api/events/${event_id}`)
      .then((res) => {
        setEvent(res.data.event);
      })
      .catch((err) => {
        setError("Event not found or failed to load.");
      });
  }, [event_id]);

  const handleSignup = () => {
    axios
      .post("/api/signups", { user_id, event_id: Number(event_id) })
      .then(() => {
        setMessage("Successfully signed up for the event!");
        setError("");
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setError("You are already signed up for this event.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setMessage("");
      });
  };

  if (error && !event)
    return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <p className="text-center">Loading event details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-xl space-y-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </div>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        onClick={handleSignup}
      >
        Sign Up Now
      </button>
    </div>
  );
}
