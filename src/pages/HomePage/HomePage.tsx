import { Link } from "react-router-dom";
import video from "../../assets/videos/homepage-video.mp4";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="homepage">
      <video className="video" src={video} muted loop autoPlay></video>
      <div className="overlay"></div>
      <div className="homepage__text">
        <h2 className="homepage__title">MovieMuse: </h2>
        <h3 className="homepage__subtitle">
          Where Movies Meet Your Imagination
        </h3>
        <p className="homepage__description">
          Moviemuse goes beyond recommendations. Create your personalized
          watchlist, a curated collection of movies you want to watch or
          revisit. Keep track of upcoming releases, mark favorites, and plan
          your movie nights effortlessly. With Moviemuse as your faithful
          companion, you'll never miss a captivating film or lose sight of the
          ones you love.
        </p>
        <div className="homepage__button-container">
          <Link className="homepage__button" to="/signup">
            Explore
          </Link>
          <Link className="homepage__button" to="/login">
            Existing User? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
