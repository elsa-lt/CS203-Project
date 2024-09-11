import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar';

const AdminDashboardPage = () => {
  return (
    <main
      className="flex flex-col min-h-screen items-center justify-start bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <Navbar />
      
    </main>
  );
};

export default AdminDashboardPage;
