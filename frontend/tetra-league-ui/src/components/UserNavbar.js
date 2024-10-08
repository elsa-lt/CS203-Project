import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import ProfileDropDown from '../components/ProfileDropDown';

const UserNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white p-1 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
      <div className="flex flex-shrink-0">
        <div className="text-customGray text-3xl font-bold mr-8">
          <Link to="/home">
          <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
      </div>
      {/*RHS Element Container*/}
      <div className = "flex">
        {/*Header Container*/}
        <ul className="flex text-l text-center text-customGray space-x-6">
          <li>
            <Link
              to="/current-match"
              className={`helvetica-neue customGray ${location.pathname === '/current-match' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`} >
              Current Match
            </Link>
          </li>
          <li>
            <Link
              to="/tournaments"
              className={`helvetica-eue customGray ${location.pathname === '/tournaments' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Tournaments
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className={`helvetica-neue customGray ${location.pathname === '/leaderboard' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/match-history"
              className={`helvetica-neue customGray ${location.pathname === '/match-history' ? 'font-medium text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Match History
            </Link>
          </li>
        </ul>

        <div className="flex ml-6 mr-6">
          <button className="text-Custom-Gray hover:text-yellow-400 cursor-pointer">
            <BiBell className="text-2xl" />
          </button>
        </div>

        <ProfileDropDown />
      </div>
    </nav>
  );
};

export default UserNavbar;