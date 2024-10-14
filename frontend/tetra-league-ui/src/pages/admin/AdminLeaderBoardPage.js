import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import AdminLeaderBoardSubtabs from '../../components/AdminLeaderBoardSubtabs';

const AdminLeaderBoardPage = () => {
  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
        
      <div className="fixed">
      <AdminNavbar/>
      <AdminSidebar/>
      </div>

      <div className="flex flex-col min-h-screen w-full mt-20 ml-72 mr-12">
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

        <AdminLeaderBoardSubtabs />
      </div>
    </main>
  );
};
export default AdminLeaderBoardPage;