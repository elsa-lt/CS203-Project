import React from 'react';
import Navbar from '../../components/UserNavbar';

const ProfilePage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/Blue Red Background.png')` }}
    >
        <Navbar />
    </main>
  );
};

export default ProfilePage;
