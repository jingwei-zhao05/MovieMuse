import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import {
  deleteUsersWatchlistEndpoint,
  getUsersWatchlistEndpoint,
} from "../../utils/api";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./WatchListPage.scss";
import removeIcon from "../../assets/icons/remove-icon.png";
import { toast } from "react-toastify";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
}

export default function WatchListPage() {
  const { userId } = useParams();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(getUsersWatchlistEndpoint(userId));
          const movies = response.data.map(
            (movie: {
              movie_id: number;
              title: string;
              release_date: string;
              poster_path: string;
            }) => ({
              id: movie.movie_id,
              title: movie.title,
              releaseDate: movie.release_date,
              posterPath: movie.poster_path,
            })
          );
          setWatchlist(movies);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleMovieClick = (id: number): void => {
    navigate(`/${userId}/movie/${String(id)}`);
  };

  const handleRemoveClick = (
    userId: string | undefined,
    movieId: string
  ): void => {
    if (userId) {
      axios
        .delete(deleteUsersWatchlistEndpoint(userId, movieId))
        .then(() => {
          toast.success("Successfully deleted the movie");
        })
        .catch((err) => {
          toast.error(err.response.data.messagege);
        });
    }
  };

  return (
    <article className="watchlist">
      <SideMenu userId={userId} />
      <div className="watchlist__header">
        <h1 className="watchlist__title">Welcome to your Watchlist</h1>
        <p className="watchlist__text">
          Browse movies, add them to watchlists and share them with friends.
        </p>
      </div>
      <div className="watchlist__movies">
        {watchlist.map((movie) => (
          <div className="movie-card__container" key={movie.id}>
            <MovieCard
              className="movie-card"
              title={movie.title}
              id={movie.id}
              imgSrc={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
              releaseDate={movie.releaseDate}
              handleClick={() => handleMovieClick(movie.id)}
            />
            <button
              className="remove-icon"
              onClick={() => handleRemoveClick(userId, String(movie.id))}
            >
              <img
                className="remove-icon__img"
                src={removeIcon}
                alt="remove movie"
              />
            </button>
            <div className="remove-icon__message">Remove movie</div>
          </div>
        ))}
      </div>
    </article>
  );
}
