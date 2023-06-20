export const API_URL = "http://localhost:8080";

export const getUsersEndpoint = `${API_URL}/users`;
export const postUserEndpoint = getUsersEndpoint;
export const userLoginEndpoint = `${getUsersEndpoint}/login`;
export const selectMoviesEndpoint = `${getUsersEndpoint}/select-movies`;
