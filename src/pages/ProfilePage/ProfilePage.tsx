import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUsersFavouriteMovies, token } from "../../utils/api";
import { recommendationsEndpoint } from "../../utils/external-api";
import "./ProfilePage.scss";

interface Movie {
  movie_id: number;
  title: string;
  img_src: string;
  release_date: string;
}

interface User {
  user_id: number;
  user_name: string;
}

interface ExternalMovie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

export default function ProfilePage() {
  const { id } = useParams();
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [user, setUser] = useState<User>();
  const [recommendedMovies, setRecommendedMovies] = useState<ExternalMovie[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res1 = await axios.get(getUsersFavouriteMovies(id));
          const newMovies: Movie[] = res1.data.map((item: Movie) => ({
            movie_id: item.movie_id,
            release_date: item.release_date,
            title: item.title,
            img_src: item.img_src,
          }));
          const user: User = {
            user_id: res1.data[0]?.userId,
            user_name: res1.data[0]?.user_name,
          };
          setSelectedMovies(newMovies);
          setUser(user);

          const movieIdArr: string[] = newMovies.map((movie) =>
            String(movie.movie_id)
          );

          const promises = movieIdArr.map((movieId) => {
            return axios.get(recommendationsEndpoint(movieId), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });

          const responses = await Promise.all(promises);
          const recommendedMovies: ExternalMovie[] = [];
          const addedMovieIds: Set<number> = new Set(movieIdArr.map(Number));

          for (const response of responses) {
            const movies: ExternalMovie[] = response.data.results.filter(
              (movie: { poster_path: any; id: number }) =>
                movie.poster_path && !addedMovieIds.has(movie.id)
            );

            for (let i = 0; i < Math.min(4, movies.length); i++) {
              recommendedMovies.push(movies[i]);
              addedMovieIds.add(movies[i].id);
              if (recommendedMovies.length === 20) {
                break;
              }
            }

            if (recommendedMovies.length === 20) {
              break;
            }
          }
          setRecommendedMovies(recommendedMovies);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <article>
      <div className="selected-movies">
        <h1 className="selected-movies__title">
          Here is your favourite movies:{" "}
        </h1>
        <ul className="selected-movies__list">
          {selectedMovies.map((movie) => {
            return (
              <li className="selected-movies__item" key={movie.movie_id}>
                <img
                  className="selected-movies__img"
                  src={movie.img_src}
                  alt={movie.title}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recommended-movies">
        <h1>Movies you may like: </h1>
        <ul className="selected-movies__list">
          {recommendedMovies.map((movie) => {
            return (
              <li className="selected-movies__item" key={movie.id}>
                <img
                  className="selected-movies__img"
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
