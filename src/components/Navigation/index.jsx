import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const { isAuthenticated, umpire } = useAuth();
  return (
    <nav>
      {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
      {!isAuthenticated && <NavLink to="/signup">Signup</NavLink>}
      {isAuthenticated && <NavLink to="/match-setup">Create new match</NavLink>}
      <NavLink to="/matches">All matches</NavLink>
      {isAuthenticated && <NavLink to={`/matches/umpires/${umpire._id}`}>Matches created by me</NavLink>}
    </nav>
  );
}
