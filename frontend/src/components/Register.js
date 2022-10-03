import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Sign Up</h3>

          <input
            type="text"
            className="auth-form__textfield"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="auth-form__textfield"
            name="password"
            value={password}
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Sign up
          </button>
          <p className="auth-form__text">
            Already a member?{" "}
            <Link to="/signin" className="auth-form__link">
              Log in here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
