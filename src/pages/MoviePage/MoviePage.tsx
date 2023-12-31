import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  movieEndpoint,
  castsEndpoint,
  similarEndpoint,
} from "../../utils/external-api";
import {
  postMoviesEndpoint,
  postUsersWatchlistEndpoint,
  token,
} from "../../utils/api";
import "./MoviePage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Carousel } from "@mantine/carousel";
import MovieCard from "../../components/MovieCard/MovieCard";
import { toast } from "react-toastify";
import SideMenu from "../../components/SideMenu/SideMenu";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
  tagline: string;
  genres: Genre[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export default function Movie() {
  const { userId, movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [casts, setCasts] = useState<Cast[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (movieId) {
          const response1 = await axios.get(movieEndpoint(movieId), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const newMovie: Movie = {
            id: response1.data.id,
            title: response1.data.title,
            overview: response1.data.overview,
            tagline: response1.data.tagline,
            genres: response1.data.genres,
            releaseDate: response1.data.release_date,
            posterPath: response1.data.poster_path,
            backdropPath: response1.data.backdrop_path,
          };

          setMovie(newMovie);

          const response2 = await axios.get(castsEndpoint(movieId), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const castArr = response2.data.cast.map(
            (cast: {
              id: number;
              name: string;
              character: string;
              profile_path: string;
            }) => ({
              id: cast.id,
              name: cast.name,
              character: cast.character,
              profilePath: cast.profile_path,
            })
          );
          setCasts(castArr);

          const response3 = await axios.get(similarEndpoint(movieId), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const movies = response3.data.results.map(
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
          setSimilarMovies(movies);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [movieId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleMovieClick = (id: number): void => {
    navigate(`/${userId}/movie/${String(id)}`);
  };

  function handleFavClick(): void {
    axios
      .post(postMoviesEndpoint, {
        user_id: userId,
        movie_id: movieId,
      })
      .then(() => {
        toast.success("Successfully added to favourite movies");
      })
      .catch((err) => {
        if (err.response.data.message === "Movie already exist") {
          toast.error("Movie already exist");
        }
      });
  }

  function handleWatchlistClick(): void {
    axios
      .post(postUsersWatchlistEndpoint, {
        user_id: userId,
        movie_id: movieId,
        title: movie?.title,
        release_date: movie?.releaseDate,
        poster_path: movie?.posterPath,
      })
      .then(() => {
        toast.success("Successfully added to watchlist");
      })
      .catch((err) => {
        if (err.response.data.message === "Movie already exist") {
          toast.error("Movie already exist");
        }
      });
  }

  return (
    <>
      {movie && (
        <div className="movie">
          <SideMenu userId={userId} />
          <div className="movie__container">
            <div className="movie__overlay"></div>
            <img
              className="movie__background"
              src={`https://image.tmdb.org/t/p/w1280/${movie.backdropPath}`}
              alt="movie background"
            />
            <div className="movie__content">
              <img
                className="movie__poster"
                src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
                alt="movie poster"
              />
              <div className="movie__text">
                <h1 className="movie__title">{movie.title}</h1>
                <p className="movie__release-date">{movie.releaseDate}</p>
                <p className="movie__tagline">{movie.tagline}</p>
                <p className="movie__overview">{movie.overview}</p>
              </div>
              <ul className="movie__genres">
                {movie.genres.map((genre: Genre) => (
                  <li className="movie__genre" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
              <div className="button__container">
                <button
                  className="button button--movie"
                  onClick={handleFavClick}
                >
                  Mark as Favourite
                </button>
                <button
                  className="button button--movie"
                  onClick={handleWatchlistClick}
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
          <div className="movie__cast-container">
            <h1 className="movie__cast-title">Casts</h1>
            <Carousel
              withIndicators
              height={250}
              slideSize="10%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
              breakpoints={[{ minWidth: "80rem", slideSize: "8%" }]}
              className="movie__casts"
            >
              {casts.map(
                (cast: Cast) =>
                  cast.profilePath && (
                    <Carousel.Slide key={cast.id}>
                      <li className="movie__cast" key={cast.id}>
                        <img
                          className="movie__cast-image"
                          src={`http://image.tmdb.org/t/p/w185/${cast.profilePath}`}
                          alt="cast"
                        />
                        <h3 className="movie__cast-name">{cast.name}</h3>
                        <p className="movie__cast-character">
                          {cast.character}
                        </p>
                      </li>
                    </Carousel.Slide>
                  )
              )}
            </Carousel>
          </div>
          <div className="movie__similar-container">
            <h1 className="movie__similar-title">Similar Movies:</h1>
            <Carousel
              withIndicators
              height={400}
              slideSize="20%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
              breakpoints={[{ minWidth: "80rem", slideSize: "10%" }]}
              className="movie__similar"
            >
              {similarMovies.map(
                (movie) =>
                  movie.posterPath && (
                    <Carousel.Slide key={movie.id}>
                      <MovieCard
                        className="movie-card"
                        key={movie.id}
                        title={movie.title}
                        id={movie.id}
                        imgSrc={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
                        releaseDate={movie.releaseDate}
                        handleClick={() => handleMovieClick(movie.id)}
                      />
                    </Carousel.Slide>
                  )
              )}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}
