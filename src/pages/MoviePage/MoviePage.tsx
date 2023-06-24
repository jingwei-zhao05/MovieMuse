import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  selectMoviesEndpoint,
  getMoviesEndpoint,
  postMoviesEndpoing,
} from "../../utils/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./MoviePage.scss";

interface Movie {
  id: number;
  movie_id: number;
  title: string;
  img_src: string;
  release_date: string;
}

export default function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header
    const token = sessionStorage.getItem("authToken");
    axios
      .get(selectMoviesEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setUserName(response.data.userName);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(getMoviesEndpoint).then((res) => {
      setMovies(res.data);
      setIsLoading(false);
    });
  }, []);

  const handleMovieClick = (movie: Movie): void => {
    if (selectedMovies.includes(movie)) {
      // If movie is already selected, remove it from the selectedMovies array
      setSelectedMovies(
        selectedMovies.filter((selectedMovie) => selectedMovie !== movie)
      );
    } else {
      // If movie is not selected and selected games less than 3,add it to the selectedMovies array
      if (selectedMovies.length < 5) {
        setSelectedMovies([...selectedMovies, movie]);
      }
    }
  };

  const handleClick = (): void => {
    selectedMovies.map((movie: Movie) => {
      axios
        .post(postMoviesEndpoing, {
          userId: userId,
          movieId: movie.id,
          movie_id: movie.movie_id,
        })
        .then((res) => {
          console.log(res);
          navigate(`/${userId}/profile`);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <article className="select-movies">
      <h1 className="select-movies__title">
        Welcome {userName}! Please select 5 movies you like:
      </h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            className={
              selectedMovies.includes(movie)
                ? "movie-card movie-card--selected"
                : "movie-card"
            }
            key={movie.id}
            title={movie.title}
            id={movie.id}
            imgSrc={movie.img_src}
            releaseDate={movie.release_date}
            handleClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>
      {/* // return (
            // <li className="movies-list__item" key={movie.id}>
            //   <img
            //     className={
            //       selectedMovies.includes(movie)
            //         ? "movies-list__img movies-list__img--selected"
            //         : "movies-list__img"
            //     }
            //     src={movie.img_src}
            //     alt={movie.title}
            //     onClick={() => handleMovieClick(movie)}
            //   />
            //   <p className="movies-list__title">{movie.title}</p>
            //   <p className="movies-list__year">{movie.release_date}</p>
            // </li>
        //   );
        // })}
          </div> */}
      <button
        className="movie-select__button"
        onClick={handleClick}
        disabled={selectedMovies.length < 5}
      >
        Next
      </button>
    </article>
  );
}
