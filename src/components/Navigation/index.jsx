import React from "react";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const { isAuthenticated, umpire } = useAuth();
  const { logout } = useAuthUpdate();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">All matches</NavLink>
        </li>

        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>

        {!isAuthenticated && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {!isAuthenticated && (
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <NavLink to="/match-setup">Start new match</NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <NavLink to={`/matches/umpires/${umpire._id}`}>
              Matches created by me
            </NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
