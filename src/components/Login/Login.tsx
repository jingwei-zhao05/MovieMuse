import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../../constants/formFields";
import Input from "../Input/Input";
import FormAction from "../FormAction/FormAction";
import FormExtra from "../FormExtra/FormExtra";
import axios from "axios";
import {
  userLoginEndpoint,
  getUsersFavouriteMovies,
  selectMoviesEndpoint,
} from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

const fields = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [userId, setUserId] = useState<number>(0);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // grab the values from the form
    const email = loginState.email;
    const password = loginState.password;

    // send an axios POST request
    try {
      const response1 = await axios.post(userLoginEndpoint, {
        email,
        password,
      });
      sessionStorage.setItem("authToken", response1.data.token);

      const response2 = await axios.get(selectMoviesEndpoint, {
        headers: {
          Authorization: `Bearer ${response1.data.token}`,
        },
      });
      const userId = response2.data.userId;

      setUserId(userId);

      const response3 = await axios.get(getUsersFavouriteMovies(userId));
      console.log(response3.data);

      if (response3.data) {
        navigate(`/${userId}/profile`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === "Invalid credentials") {
          toast.error("Invalid user email or password");
        } else {
          navigate(`/${userId}/movie-select`);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__container">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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
      </div>
      <FormExtra />
      <FormAction
        handleSubmit={handleSubmit}
        text="Login"
        type="Button"
        action=""
      />
    </form>
  );
}
