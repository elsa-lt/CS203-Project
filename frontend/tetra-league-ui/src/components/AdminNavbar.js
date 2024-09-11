import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <div className="text-white text-3xl font-bold mr-8">
          <Link to="/dashboard">
            <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-16" />
          </Link>
        </div>
        <ul className="text-white flex space-x-56 text-xl p-4">
          <li>
            <Link
              to="/manage-tournaments"
              className={`font-bold font-press-start ${location.pathname === '/manage-tournaments' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              TOURNAMENTS
            </Link>
          </li>
          <li>
            <Link
              to="/manage-participants"
              className={`font-press-start ${location.pathname === '/manage-participants' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              PARTICIPANTS
            </Link>
          </li>
          <li>
            <Link
              to="/manage-schedules"
              className={`font-press-start ${location.pathname === '/manage-schedules' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              SCHEDULES
            </Link>
          </li>
          <li>
            <Link
              to="/manage-results"
              className={`font-press-start ${location.pathname === '/manage-results' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              RESULTS
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
