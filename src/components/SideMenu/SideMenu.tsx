import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./SideMenu.scss";

export default function SideMenu() {
  return (
    <Menu>
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>
      <Link id="showing" className="menu-item" to="/showing">
        Now Showing
      </Link>
      <Link id="upcoming" className="menu-item" to="/upcoming">
        Upcoming
      </Link>
      <Link id="popular" className="menu-item" to="/popular">
        Popular
      </Link>
      <Link id="contact" className="menu-item" to="/top-rated">
        Top Rated
      </Link>
      <Link id="profile" className="menu-item" to="/profile">
        Profile
      </Link>
      <Link id="contact" className="menu-item" to="/contact">
        Contact Me
      </Link>
    </Menu>
  );
}
