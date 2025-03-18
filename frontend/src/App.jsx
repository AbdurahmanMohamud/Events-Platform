import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import LoginPage from "./pages/loginPage";
import NavBar from "./components/Navbar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/events/:event_id"
          element={
            user ? (
              <EventDetails user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
