import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
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
      <ToggleSwitch />
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <NavLink to="/profile" className="header__user-container">
        <p className="header__username">Terrence Tenegne</p>
        <img src={avatar} alt="Terrence Tenegne" className="header__avatar" />
      </NavLink>
    </header>
  );
}

export default Header;
