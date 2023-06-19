import "./FormExtra.scss";

export default function FormExtra() {
  return (
    <div className="form-extra">
      <div className="form-extra__checkbox">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="form-extra__input"
        />
        <label htmlFor="remember-me" className="form-extra__label">
          Remember me
        </label>
      </div>

      <div className="form-extra__text">
        <a href="#" className="form-extra__link">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}
