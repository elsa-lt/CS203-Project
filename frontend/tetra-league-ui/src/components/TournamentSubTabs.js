import React, { useState } from 'react';

const Tabs = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('Overview');

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full mx-auto">
      {/* Tab navigation */}
      <div className="flex justify-around border-b border-gray-300">
        <button
          className={`py-2 px-4
            ${activeTab === 'Overview' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('Overview')}
        >
          Overview
        </button>
        <button
          className={
            `py-2 px-4 
            ${activeTab === 'Participants' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('Participants')}
        >
          Participants
        </button>
        <button
          className={
            `py-2 px-4
            ${activeTab === 'Matches' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('Matches')}
        >
          Matches
        </button>
        <button
          className={`py-2 px-4
            ${activeTab === 'Past Matches' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('Past Matches')}
        >
          Past Matches
        </button>
        <button
          className={`py-2 px-4
            ${activeTab === 'Match Chart' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('Match Chart')}
        >
          Match Chart
        </button>




      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'Overview' && (
          <div>
            {/*Overview*/}
            <div className="flex w-full gap-6 justify-between">
              {/*Tournament Details and Rules */}
              <div className="flex rounded-lg border border-customGray border-opacity-30 bg-white bg-opacity-80 mt-6 p-6">
                <div className="flex flex-col gap-6 Helvetica Neue text-customGray">
                  <div className="font-sans-serif text-customGray text-2xl">DESCRIPTION</div>
                  <div className="font-thin space-y-4">
                    <p>🎮 Welcome to the Puyo Puyo Tetris 2 Showdown! 🎮</p>
                    <p>Test your puzzle-solving skills and strategic thinking in this high-energy,
                    fast-paced Puyo Puyo Tetris 2 tournament! 
                    Whether you’re a combo master in Puyo Puyo or a block-stacking champion in Tetris, 
                    this tournament has something for everyone. 
                    Get ready for exciting matchups, fierce competition, and non-stop action as you battle 
                    it out for the top spot!</p>
                  </div>
                  <div className="font-sans-serif text-customGray text-2xl">TOURNAMENT DETAILS</div>
                  <div className="font-thin space-y-4">
                    <p>🎮 Welcome to the Puyo Puyo Tetris 2 Showdown! 🎮</p>
                    <p>Test your puzzle-solving skills and strategic thinking in this high-energy,
                    fast-paced Puyo Puyo Tetris 2 tournament! 
                    Whether you are a combo master in Puyo Puyo or a block-stacking champion in Tetris, 
                    this tournament has something for everyone. 
                    Get ready for exciting matchups, fierce competition, and non-stop action as you battle 
                    it out for the top spot!</p>
                  </div>
                </div>
              </div>

              {/*Organiser & Prizes*/}
              <div className="flex flex-col right-0">
                {/*Organiser*/}
                <div className="flex flex-col min-w-[320px] rounded-lg border border-customGray border-opacity-30 bg-white bg-opacity-80 mt-6 p-6">
                  <div className="flex pb-4">
                    <p className="font-thin">Organised By</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/Online Images/nintendo-switch.png"
                      alt="Creator Profile Pic"
                      className="h-10 w-10 mr-4">
                    </img>
                    <p className="font-sans-serif text-customGray text-xl"> NINTENDO OF AMERICA</p>
                  </div>
                </div>
                {/*Prizes*/}
                <div className="flex flex-col w-full justify-center rounded-lg border border-customGray border-opacity-30 bg-white bg-opacity-80 mt-6 p-6">
                  <div className="flex flex-col items-center Helvetica Neue text-customGray font-medium gap-6 pb-10">
                    <p className="text-2xl font-sans-serif text-customGray">TOTAL PRIZES</p>
                    <p className="text-4xl font-sans-serif text-customGray">$225</p>
                  </div>
                  <div className="flex justify-between pb-2">
                    <p className="Helvetica Neue font-thin">Placement</p>
                    <p className="Helvetica Neue font-thin">Player Prize</p>
                  </div>
                  <div className="flex w-full justify-between bg-gray-300 bg-opacity-40 rounded-lg p-4 mb-2">
                    <p className="pl-2 font-sans-serif text-customGold">1ST</p>
                    <p className="pr-2 font-sans-serif text-customGray">$100</p>
                  </div>
                  <div className="flex w-full justify-between bg-gray-300 bg-opacity-40 rounded-lg p-4 mb-2">
                    <p className="pl-2 font-sans-serif text-customSilver">2ND</p>
                    <p className="pr-2 font-sans-serif text-customGray">$75</p>
                  </div>
                  <div className="flex w-full justify-between bg-gray-300 bg-opacity-40 rounded-lg p-4 mb-2">
                    <p className="pl-2 font-sans-serif text-customBronze">3RD</p>
                    <p className="pr-2 font-sans-serif text-customGray">$50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Details' && (
          <div>
            <h2 className="text-2xl font-semibold">Details</h2>
            <p>This is the Details content.</p>
          </div>





        )}
        {activeTab === 'Settings' && (
          <div>
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p>This is the Settings content.</p>
          </div>






        )}
      </div>
    </div>
  );
};

export default Tabs;