export const TMDB_API = "https://api.themoviedb.org/3/movie";

export const movieEndpoint = (movieId: string) =>
  `${TMDB_API}/${movieId}?language=en-US`;
export const recommendationsEndpoint = (movieId: string) =>
  `${TMDB_API}/${movieId}/recommendations?language=en-US&page=1`;
export const castsEndpoint = (movieId: string) =>
  `${TMDB_API}/${movieId}/credits?language=en-US`;
export const similarEndpoint = (movieId: string) =>
  `${TMDB_API}/${movieId}/similar?language=en-US&page=1`;
