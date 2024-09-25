import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Navbar from '../../components/UserNavbar';
import TournamentCardsSmall from '../../components/TournamentCardsSmall';

const ManageTournamentsPage = () => {
  return (
    <div className="flex">
    <AdminSidebar className="fixed top-0 left-0 h-full w-80 z-10" />
    <main
      className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      
      <div className="fixed">
        <Navbar />
        <AdminSidebar />
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
      
        <div className="flex justify-center mt-6 mb-10">
          <div className="flex font-medium underline text-customGray pr-32">
            My Events
          </div>
          <div className="flex font-light helvetica-neue text-customGray">
            All Tournaments
          </div>
        </div>
        
        <div className="relative flex items-center z-0 mb-10">
          <div className = "flex flex-grow-0 w-30 h-10">
            <img
              src="/Headers/Sub Title Bar.png"
              alt="Sub Title Bar"
              className="w-30 h-10">
            </img>
            <div className="absolute flex font-sans-serif text-white text-lg ml-8 mt-1">
              MY TOURNAMENTS
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full gap-6">
          <TournamentCardsSmall />
          <TournamentCardsSmall />
          <TournamentCardsSmall />
        </div>

      </div>
      
    </main>
    </div>
  );
};

export default ManageTournamentsPage;

