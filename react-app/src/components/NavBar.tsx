import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import "../css/Navbar.css";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">FlipNet</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>

            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      {isAuthenticated ? (
        <div className="navbar-user-info">
        Welcome, {user?.firstName}!
      </div>
      ) : (
        <></>
      )}
      
    </nav>
  );
};

export default NavBar;
