import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative z-10 flex justify-between items-center px-6 py-4 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
      <div
        className="text-2xl font-bold text-white cursor-pointer"
        onClick={() => navigate(currentUser ? "/home" : "/")}
      >
        Lira
      </div>

      {currentUser ? (
        <div className="flex items-center gap-4">
          <div className="text-neutral-300 hidden sm:block">
            Welcome, {currentUser?.name || "User"}
          </div>
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/search")}
            className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
