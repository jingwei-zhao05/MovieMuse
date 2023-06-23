import FormHeader from "../../components/FormHeader/FormHeader";
import Login from "../../components/Login/Login";
import video from "../../assets/videos/Untitled.mp4";
import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <>
      <video className="video" src={video} muted loop autoPlay></video>
      <div className="login-page">
        <FormHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </>
  );
}
