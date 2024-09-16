import React from 'react';
import Navbar from '../../components/AdminNavbar';

const ManageTournamentsPage = () => {
  return (
    <div className="flex">
    <Navbar className="fixed top-0 left-0 h-full w-80 z-10" />
    <main
      className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="text-4xl font-bold font-press-start mb-4 ml-4 text-gray-700">
        MANAGE TOURNAMENTS
      </div>
    </main>
  </div>
  );
};

export default ManageTournamentsPage;
