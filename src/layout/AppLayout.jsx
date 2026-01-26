import { Outlet, NavLink } from "react-router-dom";
import "./appLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faGhost,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function AppLayout() {
  return (
    <div className="app-container">
      {/************************** Sidebar ***************************/}
      <nav className="sidebar">
        <ul className="sidebar-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              <FontAwesomeIcon icon={faHouse} className="sidebar-icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees">
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
              Employés
            </NavLink>
          </li>
          <li>
            <NavLink to="/absences">
              <FontAwesomeIcon icon={faGhost} className="sidebar-icon" />
              Absences
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <FontAwesomeIcon icon={faTags} className="sidebar-icon" />
              Services
            </NavLink>
          </li>
        </ul>
      </nav>

      {/************************ Main content ************************/}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
