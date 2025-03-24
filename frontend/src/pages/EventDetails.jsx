import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "948056576491-35kekoma63mo980flnmpbu578rspepin.apps.googleusercontent.com";

const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default function EventDetails({ user }) {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/events/${event_id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error(err));
  }, [event_id]);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setGapiLoaded(true);
          console.log("GAPI fully initialized (with Calendar API)");
        })
        .catch((error) => {
          console.error("Error initializing gapi client:", error);
        });
    });
  }, []);

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

  const addToGoogleCalendar = () => {
    if (!event) {
      setMessage("Event details not available.");
      return;
    }

    const auth = gapi.auth2.getAuthInstance();

    if (!auth.isSignedIn.get()) {
      auth
        .signIn()
        .then(createEvent)
        .catch((error) => {
          console.error("Error signing in:", error);
          setMessage("Sign-in failed.");
        });
    } else {
      createEvent();
    }
  };

  const createEvent = () => {
    if (!gapi.client.calendar) {
      console.error("Google Calendar API is not loaded properly.");
      setMessage("Google Calendar API is not ready.");
      return;
    }

    const eventDetails = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.date,
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(
          new Date(event.date).getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: "UTC",
      },
      location: event.location,
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: eventDetails,
      })
      .then(() => {
        setMessage("Event added to your Google Calendar!");
      })
      .catch((error) => {
        console.error("Error adding event to Google Calendar:", error);
        setMessage("Failed to add event to Google Calendar.");
      });
  };

  const handleSignOut = () => {
    const auth = gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
      setMessage("Signed out of Google.");
    });
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

      {/* Sign Up Button */}
      <button
        onClick={handleSignup}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Sign Up
      </button>

      {/* Add to Calendar Button */}
      <button
        onClick={addToGoogleCalendar}
        disabled={!gapiLoaded}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Add to Google Calendar
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}

      {/* Sign Out Button */}
      <button onClick={handleSignOut} className="mt-2 text-red-500 underline">
        Sign out of Google
      </button>
    </div>
  );
}
