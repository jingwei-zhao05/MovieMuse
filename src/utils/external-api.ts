export const TMDB_API = "https://api.themoviedb.org/3/movie";

export const recommendationsEndpoint = (movieId: string) =>
  `${TMDB_API}/${movieId}/recommendations?language=en-US&page=1`;
