import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = (
    currentUser?.name?.trim()?.charAt(0) || "U"
  ).toUpperCase();
  const hasAvatar = Boolean(currentUser?.avatar);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" aria-label="Home">
        <img src={logo} className="header__logo" alt="Logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || ""}
      </p>

      {isLoggedIn ? (
        <div className="header__actions">
          <ToggleSwitch />
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
          <NavLink to="/profile" className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>
            {hasAvatar ? (
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar_placeholder">
                {firstLetter}
              </div>
            )}
          </NavLink>
        </div>
      ) : (
        <div className="header__actions">
          <ToggleSwitch />
          <div className="header__auth-buttons">
            <button
              type="button"
              className="header__auth-btn"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
