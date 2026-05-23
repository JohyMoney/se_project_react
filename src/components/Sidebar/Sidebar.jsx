import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Sidebar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__action-btn"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
      <button type="button" className="sidebar__action-btn" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  );
}
