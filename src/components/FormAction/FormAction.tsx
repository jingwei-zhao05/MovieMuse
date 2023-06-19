import "./FormAction.scss";

interface FormActionProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type: string;
  action: string;
  text: string;
}

export default function FormAction({
  handleSubmit,
  type,
  text,
}: FormActionProps) {
  return (
    <>
      {type === "Button" ? (
        <button type="submit" className="button" onSubmit={() => handleSubmit}>
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
