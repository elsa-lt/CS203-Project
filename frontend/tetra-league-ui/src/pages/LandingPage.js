import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="flex flex-col items-center justify-center text-white rounded-lg p-12">
        <header className="text-center">
          <img 
            src="/Headers/Tetra League Logo.png" 
            alt="Tetra League Logo"
            className="w-72 md:w-6/12 ml-80" 
          />
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mt-4">
            Sign Up for Tournaments, Compete Against Others in Ranked Leaderboards, View your Past Match Results and More
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <Link to="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
            Login
          </Link>
          <Link to="/register" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
