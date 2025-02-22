import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import "./css/App.css";

function App() {
  return (
    <UserProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
    </UserProvider>
  );
}
export default App;
