import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const user = JSON.parse(localStorage.getItem("authentication") ?? "{}");
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    localStorage.removeItem("authentication");
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div>
        <img
          src="https://images.ctfassets.net/b0y5cxnvcqgn/1RfW2FMboCnzKqbE3RmYbR/ef6d5f725dacc6dc0ffa20b0af1db46f/With_Large_Tag_Line.svg"
          width="130"
        ></img>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="text-sm font-medium">{user.email}</div>
        <button
          className="flex text-sm items-center px-2.5 py-2 space-x-2 bg-red-500 rounded hover:bg-red-600"
          onClick={onClickHandler}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
