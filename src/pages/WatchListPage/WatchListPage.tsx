import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import { getUsersWatchlistEndpoint } from "../../utils/api";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./WatchListPage.scss";

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

  return (
    <div>
      <SideMenu userId={userId} />
      <div className="watchlist">
        {watchlist.map((movie) => (
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
  );
}
