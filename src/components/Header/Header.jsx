import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/Toggleswitch";
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
      <NavLink to="/profile">Profile
      <div className="header__user-container">
        <p className="header__username">Terrence Tenegne</p>
        <img src={avatar} alt="Terrence Tenegne" className="header__avatar" />
        <NavLink to="/profile" className="header__profile-link">Profile</NavLink>
      </div>
      </NavLink>
      <div className="header__menu">
        <span className="header__menu-line"></span>
        <span className="header__menu-line"></span>
        <span className="header__menu-line"></span>
       </div>
       <div className="header__dropdown-menu">
        <NavLink to="/profile" className="header__dropdown-link">Profile</NavLink>
        <button type="button" className="header__dropdown-button" onClick={handleAddClick}>+ Add Clothes</button>
       </div>
       <div className="header__overlay"></div>
       <div className="header__sidebar">
        <p>Sidebar content goes here</p>
       </div>
       <div className="header__mobile-menu">
        <p>Mobile menu content goes here</p>
       </div>
       <div className="header__search">
        <input type="text" placeholder="Search..." className="header__search-input" />
        <button type="submit" className="header__search-button">Search</button>
       </div>
       <div className="header__notifications">
        <span className="header__notification-icon">🔔</span>
        <span className="header__notification-count">3</span>
       </div>
       <div className="header__user-menu">
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
        <div className="header__user-dropdown">
        </div>
       </div>
    </header>
  );
}

export default Header;
