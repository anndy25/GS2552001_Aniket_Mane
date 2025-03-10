import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faBox,
  faCalendarAlt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { path: "/stores", label: "Stores", icon: faStore },
  { path: "/skus", label: "SKUs", icon: faBox },
  { path: "/planning", label: "Planning", icon: faCalendarAlt },
  { path: "/charts", label: "Charts", icon: faChartBar },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 h-screen px-2 py-5 text-white bg-gray-800 border-r-2 shadow">
      <ul>
        {menuItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;

          return (
            <li
              key={path}
              onClick={() => navigate(path)}
              className={`mb-2 cursor-pointer flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-100 text-gray-800"
                    : "hover:bg-gray-100 hover:text-gray-800"
                }
              `}
            >
              <FontAwesomeIcon icon={icon} className="w-5 h-5" />
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
