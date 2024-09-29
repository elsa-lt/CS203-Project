import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

const AdminPastTournamentsPage = () => {
  return (
    <div className="flex">
    <AdminSidebar className="fixed top-0 left-0 h-full w-80 z-10" />
    <AdminNavbar />
    <main
      className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      
    </main>
  </div>
  );
};

export default AdminPastTournamentsPage;
