import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./appLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faGhost,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function AppLayout() {
  const location = useLocation();

  const pageTitles = {
    "/": "Tableau de bord",
    "/employees": "Employés",
    "/absences": "Absences",
    "/services": "Services",
  };

  const announcement = pageTitles[location.pathname] || "Page";

  useEffect(() => {
    document.title = `${announcement} | Application`;
  }, [announcement]);

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/************************** Sidebar ***************************/}
      <nav className="sidebar">
        <ul className="sidebar-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="sidebar-icon"
                aria-hidden="true"
              />
              Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees">
              <FontAwesomeIcon
                icon={faUser}
                className="sidebar-icon"
                aria-hidden="true"
              />
              Employés
            </NavLink>
          </li>
          <li>
            <NavLink to="/absences">
              <FontAwesomeIcon
                icon={faGhost}
                className="sidebar-icon"
                aria-hidden="true"
              />
              Absences
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <FontAwesomeIcon
                icon={faTags}
                className="sidebar-icon"
                aria-hidden="true"
              />
              Services
            </NavLink>
          </li>
        </ul>
      </nav>

      {/************************ Main content ************************/}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
