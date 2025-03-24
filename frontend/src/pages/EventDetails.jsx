import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default function EventDetails({ user }) {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`https://events-platform-iut7.onrender.com/api/events/${event_id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error(err));
  }, [event_id]);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => setGapiLoaded(true))
        .catch((err) => console.error("GAPI init error:", err));
    });
  }, []);

  const handleSignup = () => {
    axios
      .post("https://events-platform-iut7.onrender.com/api/signups", { user_id: user.user_id, event_id: event.event_id })
      .then(() => setMessage("You have successfully signed up for this event!"))
      .catch((err) => {
        if (err.response?.status === 400) {
          setMessage("You are already signed up for this event.");
        } else {
          setMessage("Something went wrong, please try again.");
        }
      });
  };

  const addToGoogleCalendar = () => {
    const auth = gapi.auth2.getAuthInstance();

    const createEvent = () => {
      const start = new Date(event.date);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour later

      const eventDetails = {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: start.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: "UTC",
        },
        location: event.location,
      };

      gapi.client.calendar.events
        .insert({
          calendarId: "primary",
          resource: eventDetails,
        })
        .then(() => setMessage("Event added to your Google Calendar!"))
        .catch((err) => {
          console.error("Calendar insert error:", err);
          setMessage("Failed to add event to Google Calendar.");
        });
    };

    if (!auth.isSignedIn.get()) {
      auth.signIn().then(createEvent);
    } else {
      createEvent();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl space-y-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {formatDate(event.date)}
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

      <button
        onClick={addToGoogleCalendar}
        disabled={!gapiLoaded}
        className="mt-4 ml-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Add to Google Calendar
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
