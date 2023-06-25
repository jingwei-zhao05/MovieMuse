import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  movieEndpoint,
  castsEndpoint,
  similarEndpoint,
} from "../../utils/external-api";
import { postMoviesEndpoint, token } from "../../utils/api";
import "./MoviePage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Carousel } from "@mantine/carousel";
import MovieCard from "../../components/MovieCard/MovieCard";
import { toast } from "react-toastify";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
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

  function handleClick(): void {
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

  return (
    <>
      {movie && (
        <div className="movie">
          <h1 className="movie__title">This is {movie.title}</h1>
          <img
            className="movie__poster"
            src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
          />
          <button className="button button--movie" onClick={handleClick}>
            Mark as Favourite
          </button>
          <button className="button button--movie">Add to Watchlist</button>
          <p className="movie__tagline">{movie.tagline}</p>
          <p className="movie__overview">{movie.overview}</p>
          <p className="movie__release-date">{movie.releaseDate}</p>
          <ul className="movie__genres">
            {movie.genres.map((genre: Genre) => (
              <li className="movie__genre" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
          <Carousel
            withIndicators
            height={250}
            slideSize="10%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            breakpoints={[{ minWidth: "81.25rem", slideSize: "8%" }]}
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
                      <h3>{cast.name}</h3>
                      <p>{cast.character}</p>
                    </li>
                  </Carousel.Slide>
                )
            )}
          </Carousel>
          <h1 className="movie__similar-title">Similar Movies:</h1>
          <Carousel
            withIndicators
            height={400}
            slideSize="20%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            breakpoints={[{ minWidth: "81.25rem", slideSize: "10%" }]}
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
      )}
    </>
  );
}
