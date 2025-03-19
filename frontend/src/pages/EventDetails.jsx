import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetails({ user }) {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/api/events/${event_id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error(err));
  }, [event_id]);

  const handleSignup = () => {
    axios
      .post("/api/signups", { user_id: user.user_id, event_id: event.event_id })
      .then(() => {
        setMessage("You have successfully signed up for this event!");
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setMessage("You are already signed up for this event.");
        } else {
          setMessage("Something went wrong, please try again.");
        }
      });
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl space-y-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <button
        onClick={handleSignup}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Sign Up
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
