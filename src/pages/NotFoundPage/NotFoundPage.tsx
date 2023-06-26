import { Link } from "react-router-dom";
import notFoundImg from "../../assets/images/404-error.jpg";
import "./NotFoundPage.scss";

export default function NotFoundPage({}) {
  return (
    <article>
      {/* <h1 className="not-found__title">{message}</h1> */}
      <img className="not-found__image" src={notFoundImg} alt="not found" />
      <Link className="not-found__link" to="/">
        <button className="not-found__button">GO BACK</button>
      </Link>
    </article>
  );
}
