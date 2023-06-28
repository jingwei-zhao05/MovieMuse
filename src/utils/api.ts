// export const API_URL = "http://localhost:8080";
const API_URL: string = import.meta.env.VITE_REACT_APP_API_URL;

export const getUsersEndpoint = `${API_URL}/users`;
export const postUserEndpoint = getUsersEndpoint;
export const userLoginEndpoint = `${getUsersEndpoint}/login`;
export const getUserIdbyEmailEndpoint = (email: string) =>
  `${getUsersEndpoint}/${email}`;
export const selectMoviesEndpoint = `${getUsersEndpoint}/select-movies`;
export const getMoviesEndpoint = `${API_URL}/movies`;
export const postMoviesEndpoint = getMoviesEndpoint;
export const getUsersFavMoviesEndpoint = (id: string) =>
  `${getUsersEndpoint}/${id}`;
export const getUsersWatchlistEndpoint = (id: string) =>
  `${getMoviesEndpoint}/${id}/watchlist`;
export const postUsersWatchlistEndpoint = `${getMoviesEndpoint}/watchlist`;
export const deleteUsersFavMoviesEndpoint = (userId: string, movieId: string) =>
  `${getMoviesEndpoint}/${userId}/${movieId}`;
export const deleteUsersWatchlistEndpoint = (userId: string, movieId: string) =>
  `${getMoviesEndpoint}/${userId}/watchlist/${movieId}`;

export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjgxM2ZiMmE1ZWEyNzA3NmM5MTFmMWUx" +
  "NjdkMmNlOSIsInN1YiI6IjY0ODg3NjljNmY4ZDk1MDEwMjNkYzVlZiIsInNjb3Blc" +
  "yI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l6BUvg8FC3L_vP9D6J1u2mfGKX9" +
  "yoqjd5HqwKZjXMDw";
