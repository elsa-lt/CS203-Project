import React from 'react';
import { Link } from 'react-router-dom';


const UserHomePage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/Blue Red Background.png')` }}
    >
      <div className="w-1/2 p-8 relative">
        <div className="text-center ">
          <img src="/Headers/Tetra League Logo.png" alt="Tetra League Logo" className="mx-auto mb-10" style={{ width: '400px' }} />
        </div>
        
        <ul className="text-white space-y-14 text-4xl ml-12">
          <li>
            <Link to="/current-match" className="hover:text-yellow-400 font-bold font-press-start">• CURRENT MATCH</Link>
          </li>
          <li>
            <Link to="/tournaments" className="hover:text-yellow-400 font-press-start">• TOURNAMENTS</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-yellow-400 font-press-start">• LEADERBOARD</Link>
          </li>
          <li>
            <Link to="/match-history" className="hover:text-yellow-400 font-press-start">• MATCH HISTORY</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-yellow-400 font-press-start">• PROFILE</Link>
          </li>
        </ul>
      </div>

      {/* Right Section: Current Match */}
      <div className="w-1/2 p-8 relative">
        <div className="flex justify-between items-center h-full">
          <div className="flex flex-col items-center">
            <img src="/Misc Design/Player Image 1.png" alt="Player 1" className="w-40 h-64 mb-4" />
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <p className="font-bold">Player 1</p>
              <p>Score: 999</p>
            </div>
          </div>

          <div className="text-center text-white text-6xl font-bold">
            VS
          </div>

          <div className="flex flex-col items-center">
            <img src="/Misc Design/Player Image 2.png" alt="Player 2" className="w-40 h-64 mb-4" />
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <p className="font-bold">Player 2</p>
              <p>Score: 999</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserHomePage;
