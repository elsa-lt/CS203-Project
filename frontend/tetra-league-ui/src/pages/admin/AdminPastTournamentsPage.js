import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminPastTournamentsPage = () => {
  return (
    <div className="flex">
    <AdminSidebar className="fixed top-0 left-0 h-full w-80 z-10" />
    <main
      className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80" 
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="text-4xl font-bold font-press-start mb-4 ml-4 text-gray-700">
        MANAGE RESULTS
      </div>
    </main>
  </div>
  );
};

export default AdminPastTournamentsPage;
