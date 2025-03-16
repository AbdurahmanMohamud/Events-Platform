import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update the URL to use the full path if the backend is on a different port
    axios.get('http://localhost:9090/api/events')
      .then(({ data }) => {
        setEvents(data.events);
        setLoading(false); // Data has been loaded
      })
      .catch((err) => {
        setError('Error fetching events');
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while waiting for data
  }

  if (error) {
    return <div>{error}</div>; // Display error if API call fails
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <ul className="space-y-4">
        {events.length === 0 ? (
          <li>No events found.</li>
        ) : (
          events.map((event) => (
            <li key={event.event_id} className="border p-4 rounded-xl shadow">
              <Link to={`/events/${event.event_id}`} className="text-xl font-semibold hover:underline">
                {event.title}
              </Link>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()} | {event.location}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
