import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 p-6">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white rounded-lg shadow-xl p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Tetra League</h1>
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Compete in Classis Tetris Tournaments, Track your Progress, Make Friends
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Login
          </Link>
          <Link to="/login" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
