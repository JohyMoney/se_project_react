import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || ""}
      </p>
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tenegne</p>
        <img src={avatar} alt="Terrence Tenegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
