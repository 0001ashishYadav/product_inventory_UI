import { useState } from "react";
import { NavLink } from "react-router";

const AuthHeader = () => {
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm rounded-full p-1 flex gap-1 shadow-lg border border-purple-500/30 z-10">
      {/* {["login", "signup", "forgot", "reset"].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentPage === page
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))} */}

      <NavLink
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isActive
              ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
              : "text-gray-400 hover:text-white"
          }`
        }
        to="/login"
      >
        Loin
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isActive
              ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
              : "text-gray-400 hover:text-white"
          }`
        }
        to="/signUp"
      >
        SignUp
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isActive
              ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
              : "text-gray-400 hover:text-white"
          }`
        }
        to="/"
      >
        Home
      </NavLink>
    </div>
  );
};

export default AuthHeader;
