// EventDetailsPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetails() {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/api/events/${event_id}`).then(({ data }) => {
      setEvent(data.event);
    });
  }, [event_id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p>{event.description}</p>
      <p className="mt-2 text-sm text-gray-600">Date: {event.date}</p>
      <p className="mb-4 text-sm text-gray-600">Location: {event.location}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </div>
  );
}
