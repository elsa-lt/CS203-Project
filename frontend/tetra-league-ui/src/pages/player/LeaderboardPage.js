import React from 'react';
import Navbar from '../../components/UserNavbar';
import LeaderBoardSubtabs from '../../components/LeaderBoardSubtabs';

const LeaderboardPage = () => {
  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex flex-col min-h-screen w-full mt-14 ml-5 mr-5">
        <div className="flex flex-grow-0 w-30 h-10">
          <img 
            src="/Headers/LeaderBoard Header.png"
            alt="Leaderboard Header"
            className="w-30 h-10"
          />
        </div>

        <div className="mt-6 mb-6">
          <hr className="w-full border-customGray border-opacity-30"/>
        </div>

        <LeaderBoardSubtabs />
      </div>
    </main>
  );
};
export default LeaderboardPage;