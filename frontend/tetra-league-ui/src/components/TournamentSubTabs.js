import React, { useState } from 'react';

const TournamentSubTabs = ({ tournamentId, tournamentDescription }) => {
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
        {/* Tab buttons */}
        <button className={`py-2 px-4 ${activeTab === 'Overview' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('Overview')}>Overview</button>
        <button className={`py-2 px-4 ${activeTab === 'Participants' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('Participants')}>Participants</button>
        <button className={`py-2 px-4 ${activeTab === 'Matches' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('Matches')}>Matches</button>
        <button className={`py-2 px-4 ${activeTab === 'Past Matches' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('Past Matches')}>Past Matches</button>
        <button className={`py-2 px-4 ${activeTab === 'Tournament Bracket' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('Tournament Bracket')}>Tournament Bracket</button>
      </div>

      {/* Tab content */}
      <div className="mt-6 flex flex-col h-full">
        {activeTab === 'Overview' && (
          <div className="flex-grow mt-4 p-6 rounded-lg border border-customGray border-opacity-30 bg-white bg-opacity-80">
            <div className="flex flex-col gap-6 Helvetica Neue text-customGray h-full">
              <div className="font-sans-serif text-customGray text-2xl">DESCRIPTION</div>
              <div className="font-thin space-y-4 overflow-y-auto">
                {/* Use passed description instead of hardcoded text */}
                <p>{tournamentDescription || 'Loading description...'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Participants' && (
          <div className="flex-grow mt-4 p-6 bg-white rounded-lg border border-customGray border-opacity-30">
            <h2 className="text-2xl font-semibold">Participants</h2>
            <p>This is the Participants content.</p>
          </div>
        )}
        {activeTab === 'Matches' && (
          <div className="flex-grow mt-4 p-6 bg-white rounded-lg border border-customGray border-opacity-30">
            <h2 className="text-2xl font-semibold">Matches</h2>
            <p>This is the Matches content.</p>
          </div>
        )}
        {activeTab === 'Past Matches' && (
          <div className="flex-grow mt-4 p-6 bg-white rounded-lg border border-customGray border-opacity-30">
            <h2 className="text-2xl font-semibold">Matches</h2>
            <p>This is the Past Matches content.</p>
          </div>
        )}
        {activeTab === 'Tournament Bracket' && (
          <div className="flex-grow mt-4 p-6 bg-white rounded-lg border border-customGray border-opacity-30">
            <h2 className="text-2xl font-semibold">Tournament Bracket</h2>
            <p>This is the Tournament Bracket content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentSubTabs;
