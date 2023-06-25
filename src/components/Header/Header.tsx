import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo-transparent.png";
import searchIcon from "../../assets/icons/search.svg";
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
          <img className="header__avatar" src={""} alt="Avatar" />
          {/* <Link className="header__button" to="/videoUpload">
            <img
              className="header__button-icon"
              src={""}
              alt="upload icon"
            />
            <button className="header__button-input" type="submit">
              UPLOAD
            </button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
