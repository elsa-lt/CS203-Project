import React from 'react';
import Navbar from '../../components/UserNavbar';

const CurrentMatchPage = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/Blue Red Background.png')` }}
    >
      <Navbar />
      <div className="w-1/2 h-screen p-8 flex items-center justify-center relative">
        <div className="absolute top-30 text-center">
          <img src="/Headers/Current Match Header.png" alt="Current Match" className="w-72 md:w-6/12" style={{ width: '350px' }} />
          <div>
        <img src="/Misc Design/VS Screen.png"  className="w-72 md:w-6/12" style={{ width: '350px' }} />
        <img src="/Misc Design/Player Image 1.png"  className="absolute top-80 -left-10"  style={{ width: '120px' }} />
        <img src="/Misc Design/Splash 1.png"  className="absolute top-60 -left-80"  style={{ width: '350px' }} />
        <img src="/Misc Design/Screen.png"  className="absolute top-40 -left-80"  style={{ width: '300px' }} />
        <img src="/Misc Design/Screen.png"  className="absolute top-40 -right-80"  style={{ width: '300px' }} />
        <img src="/Misc Design/Player Image 2.png"  className="absolute top-80 left-80"  style={{ width: '120px' }} />
        <img src="/Misc Design/Splash 2.png"  className="absolute -bottom-40 left-80"  style={{ width: '350px' }} />
          </div>
        </div>

      </div>

    </main>
  );
};

export default CurrentMatchPage;
