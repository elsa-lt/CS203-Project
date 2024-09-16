import React from 'react';
import Navbar from '../../components/AdminNavbar';
import Cards from '../../components/AdminCards';
import Announcements from '../../components/AdminCardsAnnouncements'; 

const AdminDashboardPage = () => {
  return (
    <div className="flex">
      <Navbar className="fixed top-0 left-0 h-full w-80 z-10" />
      <main
        className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80" 
        style={{ backgroundImage: `url('/Background/White Background.png')` }}
      >
        <div className="text-2xl font-press-start mb-6">
          DASHBOARD
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-wrap gap-6">
            <Cards />
          </div>
          <div className="mt-6">
            <Announcements />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
