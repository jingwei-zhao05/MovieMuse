import FormHeader from "../../components/FormHeader/FormHeader";
import Signup from "../../components/Signup/Signup";
import "./SignupPage.scss";

export default function SignupPage() {
  return (
    <div className="signup-page">
      <FormHeader
        heading="Signup to create an account"
        paragraph="Already have an account?  "
        linkName="Login"
        linkUrl="/login"
      />
      <Signup />
    </div>
  );
}
