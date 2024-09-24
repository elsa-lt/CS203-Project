import React from 'react';
import Navbar from '../../components/UserNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import Cards from '../../components/AdminCards';
import Announcements from '../../components/AdminCardsAnnouncements'; 

const AdminDashboardPage = () => {
  return (
    
    <main
      className="flex min-h-screen bg-cover bg-center p-6" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="flex">
        <AdminSidebar className="fixed z-10" />
        <Navbar className="fixed z-40"/>
      </div>

      <div className="flex">
        <div className="text-4xl font-bold font-press-start mb-4 ml-60 text-gray-700">
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
      </div>
    </main>
  );
};

export default AdminDashboardPage;
