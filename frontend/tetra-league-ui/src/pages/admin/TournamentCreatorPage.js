import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Navbar from '../../components/UserNavbar';

const TournamentCreatorPage = () => {
  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-6" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="flex">
        <AdminSidebar className="fixed z-10" />
        <Navbar className="fixed z-40"/>
      </div>

      <div className="flex flex-col ml-60 mt-12">
        <div className="flex text-4xl font-bold font-press-start mb-4 text-gray-700">
          Tournament Creator
        </div>
        <div className="flex flex-col space-y-6">
        </div>
      </div>
    </main>
  );
};

export default TournamentCreatorPage;
