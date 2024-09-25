import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div className="flex mr-6">
        <button 
          className="text-customGray hover:text-yellow-400 cursor-pointer" 
          onClick={toggleDropdown}>
            <CgProfile className="text-2xl" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute flex flex-col right-0 z-50 w-44 mt-4 bg-white border border-customGray border-opacity-30 rounded-lg shadow-lg">
          <ul className="flex flex-col" role="menu">
            <li>
              <Link 
                to="/profile"
                className="flex w-full justify-center rounded-tl-lg rounded-tr-lg pt-4 pb-4 font-light text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Profile
              </Link>
            </li>

            <hr className="w-full border-customGray border-opacity-30"/>

            <li>
              <Link
                className="flex w-full justify-center pt-4 pb-4 font-light text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown} // Close dropdown on click
              >
                Account Details
              </Link>
            </li>

            <hr className="border-customGray border-opacity-30"/>

            <li>
              <Link
                className="flex w-full justify-center pt-4 pb-4 font-light text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown} // Close dropdown on click
              >
                Settings
              </Link>
            </li>

            <hr className="flex w-full border-customGray border-opacity-30"/>

            <li>
              <Link
                to="/login"
                className="flex w-full justify-center rounded-bl-lg rounded-br-lg pt-4 pb-4 font-light text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown} // Close dropdown on click
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
