import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo-white-horizontal.png";
import searchIcon from "../../assets/icons/search.svg";
import avatar from "../../assets/images/avatar.png";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__nav">
        <Link to="/">
          <img className="logo" src={logo} alt="BrainFlix Logo" />
        </Link>
        <div className="header__container">
          <div className="search">
            <img className="search__icon" src={searchIcon} alt="search icon" />
            <input
              className="search__input"
              placeholder="Search"
              type="search"
            />
          </div>
          <img className="header__avatar" src={avatar} alt="Avatar" />
        </div>
      </div>
    </header>
  );
}
