import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar-brand">
        <div className="navbar-brand">
            <Link to="/" className = "nav-link">
                Favorites
            </Link>
        </div>
    </nav>
}

export default NavBar;