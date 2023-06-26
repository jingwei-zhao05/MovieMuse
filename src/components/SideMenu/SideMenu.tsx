import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./SideMenu.scss";

interface SideMenuProps {
  userId: string | undefined;
}

export default function SideMenu({ userId }: SideMenuProps) {
  return (
    <Menu>
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>
      <Link id="profile" className="menu-item" to={`/${userId}/profile`}>
        Recommendations
      </Link>
      <Link id="watchlist" className="menu-item" to={`/${userId}/watchlist`}>
        Watchlist
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
      <Link id="top-rated" className="menu-item" to="/top-rated">
        Top Rated
      </Link>
      <Link id="contact" className="menu-item" to="/contact">
        Contact Me
      </Link>
      <Link id="sign-out" className="menu-item" to="/">
        Sign out
      </Link>
    </Menu>
  );
}
