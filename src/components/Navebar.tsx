import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div>
        <img
          src="https://images.ctfassets.net/b0y5cxnvcqgn/1RfW2FMboCnzKqbE3RmYbR/ef6d5f725dacc6dc0ffa20b0af1db46f/With_Large_Tag_Line.svg"
          width="130"
        ></img>
      </div>
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded">
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
