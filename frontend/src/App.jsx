import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/loginPage";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/events/:event_id"
          element={<EventDetails user={user} />}
        />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/users-page" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
