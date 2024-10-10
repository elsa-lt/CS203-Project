import React from 'react';
import { Link } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi"; 
import { useAuth } from '../context/AuthContext'; 

const AdminNavbar = () => {
  const { logout } = useAuth(); 

  const handleLogout = () => { 
    logout();     
  };

  return (
    <nav className="bg-white p-1 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
      <div className="flex flex-shrink-0">
        <div className="text-customGray text-3xl font-bold mr-8">
          <Link to="/home">
            <img src="/Headers/Tetra League Logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
      </div>
      {/* RHS Element Container */}
      <div className="flex items-center">
        <div className="flex ml-6 mr-6">
          <button className="text-Custom-Gray hover:text-yellow-400 cursor-pointer">
            <BiBell className="text-2xl" />
          </button>
        </div>
        <div className="flex ml-6 mr-6">
          <button 
            className="text-Custom-Gray hover:text-yellow-400 cursor-pointer"
            onClick={handleLogout} 
          >
            <BiLogOut className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
