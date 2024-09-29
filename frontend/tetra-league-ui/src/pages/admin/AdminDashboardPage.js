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

      <div className="flex flex-col min-h-screen w-full mt-14 ml-60 mr-0">
      
        <div className = "flex flex-grow-0 w-30 h-10">
          <img 
            src="/Headers/Admin dashboard.png"
            alt="Dashboard Header"
            className="w-100 h-30">
          </img>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-wrap gap-6">
          <img 
            src="/Online Images/nintendo-switch.png"
            className="w-20 h-20 mt-7"
            style={{ width: '120px', height: '120px'}}>
          </img>
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
