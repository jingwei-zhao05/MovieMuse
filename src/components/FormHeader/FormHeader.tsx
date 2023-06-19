import { Link } from "react-router-dom";
import "./FormHeader.scss";

interface FormHeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

export default function FormHeader({
  heading,
  paragraph,
  linkName,
  linkUrl,
}: FormHeaderProps) {
  return (
    <div className="form-header">
      <div className="form-header__logo">
        <img
          className="form-header__img"
          alt=""
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
        />
      </div>
      <h2 className="form-header__title">{heading}</h2>
      <p className="form-header__description">
        {paragraph}
        <Link to={linkUrl} className="form-header__link">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
