import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import AdminTournamentSubtabs from '../../components/AdminTournamentSubtabs';

const ManageTournamentsPage = () => {
  return (
    <main
      className="flex min-h-screen w-full bg-cover bg-center p-6" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      
      <div className="fixed">
        <AdminNavbar />
        <AdminSidebar />
      </div>

      <div className = "flex flex-col min-h-screen w-full mt-20 ml-72 mr-12">
        <div className = "flex flex-grow-0 w-30 h-10">
          <img 
            src="/Headers/Tournaments Header.png"
            alt="Tournaments Header"
            className="w-30 h-10">
          </img>
        </div>

        <div className="mt-6 mb-6">
          <hr className="w-full border-customGray border-opacity-30"/>
        </div>
      
        <div className = "flex w-full justify-center items-center">
          <AdminTournamentSubtabs />
        </div>

      </div>
      
    </main>
  );
};

export default ManageTournamentsPage;

