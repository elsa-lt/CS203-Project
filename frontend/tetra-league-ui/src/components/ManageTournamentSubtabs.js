import React, { useState } from 'react';
import SingleMatch from './SingleMatch';
import ManageTournamentButtons from '../components/ManageTournamentButtons';
import RoundModeller from '../components/RoundModeller';

const ManageTournamentSubtabs = (
  { tournament,
    startAndInitialiseTournament,
    allMatches,
    hasStarted,
    currentRoundNumber,
    handleSelectWinners,
    isSelectingWinners,
    advanceTournament,
    completeMatch,
    getMatch }) => {
  const [activeTab, setActiveTab] = useState('match-chart');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const matchboxHeight = 100;

  return(
    <div className="w-full mx-auto">
      {/* Tab navigation */}
      <div className="flex justify-around pb-6">
        <button
          className={`text-white py-2 px-4 ${activeTab === 'participants' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('participants')}
        >
          Participants
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
      <div className="overflow-auto">
          <>
            {activeTab === 'overview' && (
              <></>
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
              <div className="flex flex-col w-full h-full items-center">
                <div className="flex h-full w-full p-10">

                    {/* <div className="flex">
                      <RoundModeller 
                        matchboxHeight={matchboxHeight}
                        currentRoundNumber={3}
                        numberOfMatches={1}/>
                    </div> */}

                    <div className="flex">
                      {allMatches.map((roundMatches, roundIndex) => (
                        <RoundModeller
                          key={roundIndex}
                          matchboxHeight={matchboxHeight}
                          currentRoundNumber={roundIndex + 1} 
                          matches={roundMatches} 
                          isSelectingWinners={isSelectingWinners}
                          completeMatch={completeMatch}
                          getMatch={getMatch}
                        />
                      ))}
                    </div>

                </div>
                <ManageTournamentButtons
                  startAndInitialiseTournament={startAndInitialiseTournament}
                  hasStarted={hasStarted}
                  handleSelectWinners={handleSelectWinners}
                  isSelectingWinners={isSelectingWinners}
                  advanceTournament={advanceTournament}/>
            </div>
            )}

            {activeTab === 'statistics' && (
              <div>
                nothing
              </div>
            )}
          </>
    </div>
  </div>
  )
};

export default ManageTournamentSubtabs;