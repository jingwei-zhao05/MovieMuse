import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
// import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideMenu />
      <Routes>
        <Route path="/" element />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:id/movie-select" element={<MoviePage />} />
        <Route path="/:id/profile" element={<ProfilePage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;
