import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import SelectMoviePage from "./pages/SelectMoviePage/SelectMoviePage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage/NowPlayingMoviesPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage/UpcomingMoviesPage";
import PopularMoviesPage from "./pages/PopularMoviesPage/PopularMoviesPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage/TopRatedMoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movie-select" element={<SelectMoviePage />} />
        <Route path="/:userId/profile" element={<ProfilePage />} />
        <Route path="/:userId/watchlist" element={<WatchListPage />} />
        <Route path="/:userId/movie/:movieId" element={<MoviePage />} />
        <Route path="/:userId/showing" element={<NowPlayingMoviesPage />} />
        <Route path="/:userId/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/:userId/popular" element={<PopularMoviesPage />} />
        <Route path="/:userId/top-rated" element={<TopRatedMoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;
