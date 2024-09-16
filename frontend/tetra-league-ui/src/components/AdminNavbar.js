import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaTrophy, FaUser, FaCalendarAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Import icons from React Icons

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-700 bg-opacity-80 p-4 fixed top-0 left-0 h-full w-80 z-50 shadow-md flex flex-col">
      <div className="flex flex-col flex-grow">
        <div className="text-gray-800 text-4xl font-bold mb-12 ml-10">
          <Link to="/dashboard">
            <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-16" />
          </Link>
        </div>
        <ul className="text-gray-200 flex flex-col space-y-6 text-lg">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 font-bold font-press-start ${location.pathname === '/dashboard' ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <FaTachometerAlt className="text-3xl" />
              <span>DASHBOARD</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-tournaments"
              className={`flex items-center space-x-2 font-bold font-press-start ${location.pathname === '/manage-tournaments' ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <FaTrophy className="text-3xl" />
              <span>TOURNAMENTS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-participants"
              className={`flex items-center space-x-2 font-bold font-press-start ${location.pathname === '/manage-participants' ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <FaUser className="text-3xl" />
              <span>PARTICIPANTS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-schedules"
              className={`flex items-center space-x-2 font-bold font-press-start ${location.pathname === '/manage-schedules' ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <FaCalendarAlt className="text-3xl" />
              <span>SCHEDULES</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-results"
              className={`flex items-center space-x-2 font-bold font-press-start ${location.pathname === '/manage-results' ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
            >
              <FaChartBar className="text-3xl" />
              <span>RESULTS</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <button className="flex items-center justify-center text-gray-200 hover:text-yellow-500 p-2 rounded-full">
          <FaSignOutAlt className="text-3xl" />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
