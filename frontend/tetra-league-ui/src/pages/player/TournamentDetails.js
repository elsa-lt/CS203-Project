//Need to link to backend API & fix responsiveness

import React from 'react';
import Navbar from '../../components/UserNavbar';
import TournamentCard from '../../components/TournamentCard';
import TournamentSubTabs from '../../components/TournamentSubTabs';


const TournamentDetails = () => {
  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="fixed">
        <Navbar />
      </div>

      <div className = "flex flex-col min-h-screen w-full mt-14 ml-5 mr-5">
        <div className = "flex flex-grow-0 w-30 h-10">
          <img 
            src="/Headers/Tournaments Header.png"
            alt="Tournaments Header"
            className="w-30 h-10">
          </img>
        </div>

        <div className="mt-6">
          <hr className="w-full border-customGray border-opacity-30"/>
        </div>

        <TournamentCard/>
        
        <div className="flex mt-10">
          <TournamentSubTabs />
        </div>

      </div>
    </main>
  );
};

export default TournamentDetails;
