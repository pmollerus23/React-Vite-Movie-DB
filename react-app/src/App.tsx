// import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./contexts/UserContext"; // Assuming UserContext is exported from here
import "./css/App.css";

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate(); 

 // Redirect to /Profile if user is null
 useEffect(() => {
  if (isAuthenticated === true && user === null) {
    navigate("/profile"); // Navigate to Profile page if user is not set up
  } else if (isAuthenticated == false) {
    navigate("/login");
  }
}, [user, isAuthenticated]); // Runs whenever the user value changes

  return (
  <div>
    <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
  </div>
    
  
  );
}
export default App;
