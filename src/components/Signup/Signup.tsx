import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../../components/FormAction/FormAction";
import Input from "../../components/Input/Input";

const fields = signupFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = () => {};

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
            customClass=""
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
