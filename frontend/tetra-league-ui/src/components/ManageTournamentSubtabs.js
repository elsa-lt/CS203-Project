import React, { useState } from 'react';

const ManageTournamentSubtabs = ({ tournaments, loading }) => {
  const [activeTab, setActiveTab] = useState('ongoing-tournaments');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return(
    <div className="w-full mx-auto">
      {/* Tab navigation */}
      <div className="flex justify-around pb-6">
        <button
          className={`text-white py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('overview')}
        >
          Overview
        </button>
        <button
          className={`text-white py-2 px-4 ${activeTab === 'participants' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('participants')}
        >
          Participants
        </button>
        <button
          className={`text-white py-2 px-4 ${activeTab === 'matches' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('matches')}
        >
          Matches
        </button>
        <button
          className={`text-white py-2 px-4 ${activeTab === 'past-matches' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('past-matches')}
        >
          Past Matches
        </button>
        <button
          className={`text-white py-2 px-4 ${activeTab === 'match-chart' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('match-chart')}
        >
          Match Chart
        </button>
        <button
          className={`text-white py-2 px-4 ${activeTab === 'statistics' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('statistics')}
        >
          Statistics
        </button>
      </div>

      {/* Tab content */}
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div>
                nothing
              </div>
            )}
            
            {activeTab === 'participants' && (
              <div>
                nothing
              </div>
            )}

            {activeTab === 'matches' && (
              <div>
                nothing
              </div>
            )}

            {activeTab === 'past-matches' && (
              <div>
                nothing
              </div>
            )}

            {activeTab === 'match-chart' && (
              <div>
                nothing
              </div>
            )}

            {activeTab === 'statistics' && (
              <div>
                nothing
              </div>
            )}
          </>
        )}
    </div>
  </div>
  )
};

export default ManageTournamentSubtabs;