import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__user-container">
                <img
                    src={avatar}
                    alt="Terrence Tenegne"
                    className="sidebar__avatar"
                />
                <p className="sidebar__username">Terrence Tenegne</p>
            </div>
        </aside>
    );
}
