import React from 'react';
import Navbar from '../../components/UserNavbar';

const MatchHistoryPage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
        <Navbar />
        <div className="w-1/2 p-8 relative">
        <div className="relative -top-40 -left-10 text-center">
          <img src="/Headers/Match History Header.png" alt="Profile" className="w-72 md:w-6/12 -ml-80"  style={{ width: '550px' }} />
          </div>
          </div>
    </main>
  );
};

export default MatchHistoryPage;
