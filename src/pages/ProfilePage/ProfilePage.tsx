import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUsersFavouriteMovies, token } from "../../utils/api";
import {
  recommendationsEndpoint,
  movieEndpoint,
} from "../../utils/external-api";
import "./ProfilePage.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import SideMenu from "../../components/SideMenu/SideMenu";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
}

interface User {
  userId: number;
  userName: string;
}

export default function ProfilePage() {
  const { userId } = useParams();
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [user, setUser] = useState<User>({ userId: 0, userName: "" });
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //first get user favourite movies from database
        if (userId) {
          const res1 = await axios.get(getUsersFavouriteMovies(userId));
          const user: User = {
            userId: res1.data[0]?.user_id,
            userName: res1.data[0]?.user_name,
          };
          setUser(user);

          //get favourite movie ids and make an array of it
          const movieIdArr: string[] = res1.data.map(
            (item: { movie_id: number }) => String(item.movie_id)
          );

          const promises1 = movieIdArr.map((movieId) => {
            return axios.get(movieEndpoint(movieId), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });

          //loop through movie id to call TMDB api to get movie info
          const responses1 = await Promise.all(promises1);
          const movies: Movie[] = [];
          for (const response of responses1) {
            const movie: Movie = {
              ...response.data,
              releaseDate: response.data.release_date,
              posterPath: response.data.poster_path,
            };
            movies.push(movie);
          }
          setSelectedMovies(movies);

          //loop through movie id to call TMDB api to get recommendation movies
          const promises2 = movieIdArr.map((movieId) => {
            return axios.get(recommendationsEndpoint(movieId), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });

          const responses2 = await Promise.all(promises2);
          const recommendedMovies: Movie[] = [];
          const addedMovieIds: Set<number> = new Set(movieIdArr.map(Number));

          for (const response of responses2) {
            //removie the movie which doesn't have poster path or duplicate of favourite movies
            const movies = response.data.results.filter(
              (movie: { poster_path: string; id: number }) =>
                movie.poster_path && !addedMovieIds.has(movie.id)
            );

            //create a list of recommendation movies, each movie id have 4 recommendation movies
            for (let i = 0; i < Math.min(4, movies.length); i++) {
              const movie: Movie = {
                ...movies[i],
                releaseDate: movies[i].release_date,
                posterPath: movies[i].poster_path,
              };
              recommendedMovies.push(movie);
              addedMovieIds.add(movies[i].id);
              // if (recommendedMovies.length === 20) {
              //   break;
              // }
            }

            // if (recommendedMovies.length === 20) {
            //   break;
            // }
          }

          setRecommendedMovies(recommendedMovies);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleMovieClick = (id: number): void => {
    navigate(`/${user.userId}/movie/${String(id)}`);
  };

  return (
    <article>
      <SideMenu userId={userId} />
      <div className="selected-movies">
        <h1 className="selected-movies__title">
          Here is your favourite movies:{" "}
        </h1>
        <div className="selected-movies__list">
          {selectedMovies.map((movie) => (
            <MovieCard
              className="movie-card"
              key={movie.id}
              title={movie.title}
              id={movie.id}
              imgSrc={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
              releaseDate={movie.releaseDate}
              handleClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </div>

      <div className="recommended-movies">
        <h1>Movies you may like: </h1>
        <div className="selected-movies__list">
          {recommendedMovies.map((movie) => (
            <MovieCard
              className="movie-card"
              key={movie.id}
              title={movie.title}
              id={movie.id}
              imgSrc={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
              releaseDate={movie.releaseDate}
              handleClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
