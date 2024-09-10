// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-bold mr-8">
          <Link to="/">
            <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        
        {/* Links */}
        <ul className="text-white flex space-x-8 text-2xl">
          <li>
            <Link to="/current-match" className="hover:text-yellow-400 font-bold font-press-start">CURRENT MATCH</Link>
          </li>
          <li>
            <Link to="/tournaments" className="hover:text-yellow-400 font-press-start">TOURNAMENTS</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-yellow-400 font-press-start">PROFILE</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-yellow-400 font-press-start">LEADERBOARD</Link>
          </li>
          <li>
            <Link to="/match-history" className="hover:text-yellow-400 font-press-start">MATCH HISTORY</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-yellow-400 font-press-start">PROFILE</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
