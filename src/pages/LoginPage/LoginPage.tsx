import FormHeader from "../../components/FormHeader/FormHeader";
import Login from "../../components/Login/Login";

export default function LoginPage() {
  return (
    <>
      <FormHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </>
  );
}
