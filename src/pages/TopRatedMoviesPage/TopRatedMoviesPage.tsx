import { useEffect, useState } from "react";
import "./TopRatedMoviesPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import { topRatedMovieEndpoint } from "../../utils/external-api";
import axios from "axios";
import { postUsersWatchlistEndpoint, token } from "../../utils/api";
import LoadingPage from "../LoadingPage/LoadingPage";
import MovieCard from "../../components/MovieCard/MovieCard";
import addIcon from "../../assets/icons/add-icon.svg";
import { toast } from "react-toastify";
import SideMenu from "../../components/SideMenu/SideMenu";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
}

export default function NowPlayingMoviesPage() {
  const { userId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(topRatedMovieEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const newMovies = response.data.results.map(
            (movie: {
              id: number;
              title: string;
              release_date: string;
              poster_path: string;
            }) => ({
              id: movie.id,
              title: movie.title,
              releaseDate: movie.release_date,
              posterPath: movie.poster_path,
            })
          );
          setMovies(newMovies);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleMovieClick = (id: number): void => {
    navigate(`/${userId}/movie/${String(id)}`);
  };

  const handleAddClick = (
    movieId: number,
    title: string,
    releaseDate: string,
    posterPath: string
  ): void => {
    axios
      .post(postUsersWatchlistEndpoint, {
        user_id: userId,
        movie_id: movieId,
        title: title,
        release_date: releaseDate,
        poster_path: posterPath,
      })
      .then(() => {
        toast.success("Successfully added to watchlist");
      })
      .catch((err) => {
        if (err.response.data.message === "Movie already exist") {
          toast.error("Movie already exist");
        }
      });
  };

  return (
    <article className="top-rated-movies">
      <SideMenu userId={userId} />
      <h1 className="top-rated-movies__title">Top Rated Movies:</h1>
      <div className="top-rated-movies__list">
        {movies.map((movie) => (
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
              className="add-icon"
              onClick={() =>
                handleAddClick(
                  movie.id,
                  movie.title,
                  movie.releaseDate,
                  movie.posterPath
                )
              }
            >
              <img
                className="add-icon__img"
                src={addIcon}
                alt="add to watchlist"
              />
            </button>
            <div className="add-icon__message">Add to watchlist</div>
          </div>
        ))}
      </div>
    </article>
  );
}
