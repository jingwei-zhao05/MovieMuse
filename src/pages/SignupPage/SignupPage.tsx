import FormHeader from "../../components/FormHeader/FormHeader";
import Signup from "../../components/Signup/Signup";
import video from "../../assets/videos/Untitled.mp4";
import "./SignupPage.scss";

export default function SignupPage() {
  return (
    <>
      <video className="video" src={video} muted loop autoPlay></video>
      <div className="signup-page">
        <FormHeader
          heading="Signup to create an account"
          paragraph="Already have an account?  "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </>
  );
}
