import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar__title">Sidebar</h2>
            <div className="sidebar__user-container">
                <p className="sidebar__username">Terrence Tenegne</p>
                <img src={avatar} alt="Terrence Tenegne" className="sidebar__avatar" />
            </div>
        </aside>
    );
}
      
  