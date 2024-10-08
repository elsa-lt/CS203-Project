import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuHome, LuPlusCircle, LuCalendar, LuArchive } from "react-icons/lu";

const AdminSidebar = ({ name, imageUrl }) => {
  const location = useLocation();

  return (
    <nav className="bg-white bg-opacity-80 pt-4 pb-4 fixed top-12 left-0 h-full w-60 z-50 shadow-md flex flex-col">
      <div className="flex flex-col">

        <div className="flex font-hevetica-neue font-medium text-customGray pb-4 pl-4 pt-4">
          Admin Tools
        </div>

        <ul className="text-customGray flex flex-col text-l">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/dashboard' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuHome className="text-3xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/create-tournament"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/create-tournament' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuPlusCircle className="text-3xl" />
              <span>Tournament Creator</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-tournaments"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/manage-tournaments' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuCalendar className="text-3xl" />
              <span>My Tournaments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-past-tournaments"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/admin-past-tournaments' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuArchive className="text-3xl" />
              <span>Past Tournaments</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminSidebar;
