import FormHeader from "../../components/FormHeader/FormHeader";
import Login from "../../components/Login/Login";
import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <div className="container">
      <div className="login-page">
        <FormHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  );
}
