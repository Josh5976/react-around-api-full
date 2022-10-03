import React from "react";
import { Link } from "react-router-dom";
import "../blocks/auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Log in</h3>

          <input
            type="text"
            className="auth-form__textfield"
            name="email"
            value={email}
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="auth-form__textfield"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Log In
          </button>
          <p className="auth-form__text">
            Not a member yet?{" "}
            <Link to="/signup" className="auth-form__link">
              Sign up here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
