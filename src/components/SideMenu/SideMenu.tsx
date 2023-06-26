import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./SideMenu.scss";

interface SideMenuProps {
  userId: string | undefined;
}

export default function SideMenu({ userId }: SideMenuProps) {
  return (
    <Menu>
      <Link id="profile" className="menu-item" to={`/${userId}/profile`}>
        Recommendations
      </Link>
      <Link id="watchlist" className="menu-item" to={`/${userId}/watchlist`}>
        Watchlist
      </Link>
      <Link id="showing" className="menu-item" to={`/${userId}/showing`}>
        Now Showing
      </Link>
      <Link id="upcoming" className="menu-item" to={`/${userId}/upcoming`}>
        Upcoming
      </Link>
      <Link id="popular" className="menu-item" to={`/${userId}/popular`}>
        Popular
      </Link>
      <Link id="top-rated" className="menu-item" to={`/${userId}/top-rated`}>
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
