import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction/FormAction";
import Input from "../Input/Input";
import axios from "axios";
import { postUserEndpoint } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.scss";

const fields = signupFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const createAccount = () => {
    const validationErrors: { [key: string]: string } = {};

    if (signupState.username.trim() === "") {
      validationErrors.username = "User name field required";
      toast.error(validationErrors.username);
    }
    if (signupState.email.trim() === "") {
      validationErrors.email = "User email field required";
      toast.error(validationErrors.email);
    }
    if (signupState.password.trim() === "") {
      validationErrors.password = "User password field required";
      toast.error(validationErrors.password);
    }
    if (signupState.password.length < 8) {
      validationErrors.password =
        "User password can not less than 8 characters";
      toast.error(validationErrors.password);
    }
    if (signupState.password !== signupState.confirmPassword) {
      validationErrors.confirmPassword =
        "Password and confirm password do not match";
      toast.error(validationErrors.confirmPassword);
    }
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(postUserEndpoint, {
          user_name: signupState.username,
          email: signupState.email,
          password: signupState.password,
        })
        .then(() => {
          toast.success("Account created successfully!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Account creation failed. Please try again.");
          console.log(error);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__container">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
          />
        ))}
        <FormAction
          handleSubmit={handleSubmit}
          text="Signup"
          type="Button"
          action=""
        />
      </div>
    </form>
  );
}
