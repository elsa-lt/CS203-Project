import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; 

const UserNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white p-1 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
      <div className="flex flex-shrink-0">
        <div className="text-Gray-Text-Colour text-3xl font-bold mr-8">
          <Link to="/home">
          <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
      </div>
      {/*RHS Element Container*/}
      <div className = "flex">
        {/*Header Container*/}
        <ul className="text-Gray-Text-Colour flex text-l space-x-6">
          <li>
            <Link
              to="/current-match"
              className={`font-light Helvetica Neue Gray-Text-Colour ${location.pathname === '/current-match' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Current Match
            </Link>
          </li>
          <li>
            <Link
              to="/tournaments"
              className={`font-light Helvetica Neue Gray-Text-Colour ${location.pathname === '/tournaments' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Tournaments
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className={`font-light Helvetica Neue Gray-Text-Colour ${location.pathname === '/leaderboard' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/match-history"
              className={`font-light Helvetica Neue Gray-Text-Colour ${location.pathname === '/match-history' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Match History
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`font-light Helvetica Neue Gray-Text-Colour ${location.pathname === '/profile' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Profile
            </Link>
          </li>
        </ul>
      {/*sign out button*/}
        <div className="flex ms-6 me-6">
          <button className="text-Gray-Text-Colour hover:text-yellow-400">
            <FaSignOutAlt className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
