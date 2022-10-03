import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logoPath from "../images/header_vector.svg";

function Header({ onSignOut, email }) {
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="header">
      <img src={logoPath} className="header__image" alt="Around the US" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <button className="header__icon"></button>
              <div className="header__wrapper">
                <p className="header__user">{email}</p>
                <button className="header__logout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <Link className="header__auth-link" to="/signin">
              Log in
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link className="header__auth-link" to="/signup">
              Sign up
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
