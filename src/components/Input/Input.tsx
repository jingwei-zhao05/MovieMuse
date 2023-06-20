import "./Input.scss";

interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
  autoComplete: string;
}

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired,
  placeholder,
  autoComplete,
}: InputProps) {
  return (
    <div className="input">
      <label htmlFor={labelFor} className="input__label">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className="input__value"
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}
