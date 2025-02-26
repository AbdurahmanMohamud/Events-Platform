import { Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage"

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
    
    <Navbar/>
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path ="/event/:id" element={<EventPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
