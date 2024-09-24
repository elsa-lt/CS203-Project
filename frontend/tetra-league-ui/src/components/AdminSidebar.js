import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuHome, LuPlusCircle, LuCalendar, LuArchive } from "react-icons/lu";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white bg-opacity-80 pt-4 pb-4 fixed top-12 left-0 h-full w-60 z-50 shadow-md flex flex-col">
      <div className="flex flex-col">
        <div className="flex font-hevetica-neue font-medium text-customGray pb-4 pl-4 pt-4">
          Ongoing Tournaments
        </div>

        <ul className="flex flex-col font-light text-customGray gap-8 text-l pb-8">
          {/*link to Tournament Page*/}
          <li>
            <Link
              to="/tournaments"
              className="flex items-center bg-customRed bg-opacity-30 pt-4 pb-4 pl-4 pr-4">
                <div className="w-12 h-12 mr-4 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/Online Images/Puyo Tournament Pic.jpg" // Update with your image path
                    alt="Tournament Icon"
                    className="w-full h-full object-cover justify-center items-center" // Adjust size as needed
                  />
                </div>
                Puyo Puyo Tetris 2 Tournament
            </Link>
          </li>
        </ul>

        <div className="flex font-hevetica-neue font-medium text-customGray pb-4 pl-4">
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
              to="/manage-participants"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/manage-participants' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuPlusCircle className="text-3xl" />
              <span>Tournament Creator</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-schedules"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/manage-schedules' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
            >
              <LuCalendar className="text-3xl" />
              <span>My Tournaments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-results"
              className={`flex items-center space-x-4 pt-4 pb-4 pl-4 font-light font-hevetica-neue text-customGray ${location.pathname === '/manage-results' ? 'text-white font-medium bg-customGray bg-opacity-80' : 'hover:text-yellow-500'}`}
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
