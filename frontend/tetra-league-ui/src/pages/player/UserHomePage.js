import React from 'react';
import { Link } from 'react-router-dom';


const UserHomePage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/Blue Red Background.png')` }}
    >
      <div className="flex flex-col w-2/5 min-h-screen mt-16">
          <img 
            src="/Headers/Tetra League Logo.png" 
            alt="Tetra League Logo" className="ml-12 mb-10" 
            style={{ width: '375px' }}> 
          </img>

      
        <ul className="text-white space-y-8 text-5xl ml-12">
          <li>
            <Link to="/current-match" className="hover:text-yellow-400 font-sans-serif">• CURRENT MATCH</Link>
          </li>
          <li>
            <Link to="/tournaments" className="hover:text-yellow-400 font-sans-serif">• TOURNAMENTS</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-yellow-400 font-sans-serif">• LEADERBOARD</Link>
          </li>
          <li>
            <Link to="/match-history" className="hover:text-yellow-400 font-sans-serif">• MATCH HISTORY</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-yellow-400 font-sans-serif">• PROFILE</Link>
          </li>
        </ul>
      </div>

      <div className="relative flex w-3/5 min-h-screen">
        <div className="absolute top-6 left-72 w-80 z-50">
          <img
            src="/Headers/Current Match Header.png"
            alt="Player 1 Image"
            className="flex w-80 h-auto">
          </img>
        </div>
        <div className="absolute top-64 left-20 w-32 z-50">
            <img
              src="/Misc Design/Player Image 1.png"
              alt="Player 1 Image"
              className="flex w-32 h-auto">
            </img>
          </div>
        <div className="absolute top-[22rem] right-20 w-28 z-50">
          <div className="w-28">
            <img
              src="/Misc Design/Player Image 2.png"
              alt="Player 1 Image"
              className="flex w-28 h-auto">
            </img>
          </div>
        </div>
        <div className="flex absolute left-40 top-40 z-0">
          <div className="w-[22rem]">
            <img
              src="/Misc Design/Screen.png"
              alt="Player 1 Image"
              className="flex w-[22rem] h-auto">
            </img>
          </div>
        </div>
        <div className="flex absolute right-36 top-[26rem] z-0">
          <div className="w-[22rem]">
            <img
              src="/Misc Design/Screen.png"
              alt="Player 1 Image"
              className="flex w-[22rem] h-auto">
            </img>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserHomePage;
