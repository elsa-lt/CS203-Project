import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <div className="text-white text-3xl font-bold mr-8">
          <Link to="/home">
            <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-16" />
          </Link>
        </div>
        <ul className="text-white flex space-x-14 text-xl p-4">
          <li>
            <Link
              to="/current-match"
              className={`font-bold font-press-start ${location.pathname === '/current-match' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              CURRENT MATCH
            </Link>
          </li>
          <li>
            <Link
              to="/tournaments"
              className={`font-press-start ${location.pathname === '/tournaments' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              TOURNAMENTS
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className={`font-press-start ${location.pathname === '/leaderboard' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              LEADERBOARD
            </Link>
          </li>
          <li>
            <Link
              to="/match-history"
              className={`font-press-start ${location.pathname === '/match-history' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              MATCH HISTORY
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`font-press-start ${location.pathname === '/profile' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              PROFILE
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
