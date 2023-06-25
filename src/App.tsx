import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SelectMoviePage from "./pages/SelectMoviePage/SelectMoviePage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";

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
        <Route path="/showing-movies" element={<ProfilePage />} />
        <Route path="/upcoming-movies" element={<ProfilePage />} />
        <Route path="/popular-movies" element={<ProfilePage />} />
        <Route path="/top-rated-movies" element={<ProfilePage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;
