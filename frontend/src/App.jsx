import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import UsersPage from "./pages/UsersPage";
//import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:event_id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/users-page" element={<UsersPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      </div>
  );
}

export default App;
