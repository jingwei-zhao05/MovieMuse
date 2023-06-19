import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../Input/Input";
import "./Login.scss";

const fields = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <form className="login-form">
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
            customClass="Input__login"
          />
        ))}
      </div>
    </form>
  );
}
