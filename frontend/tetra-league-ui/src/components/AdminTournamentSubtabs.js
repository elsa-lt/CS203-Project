import React, { useState } from 'react';
import { BsPlusCircleDotted } from "react-icons/bs";
import { Link } from 'react-router-dom';
import AdminTournamentCards from '../components/AdminTournamentCards';

const AdminTournamentSubtabs = ({ tournaments, loading }) => {
  const [activeTab, setActiveTab] = useState('ongoing-tournaments');
  const [sortAscending, setSortAscending] = useState(true);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const ongoingTournaments = tournaments.filter(tournament => {
    const currentDate = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    return startDate <= currentDate && endDate >= currentDate;
  });

  const pastTournaments = tournaments.filter(tournament => {
    const currentDate = new Date();
    const endDate = new Date(tournament.endDate);
    return endDate < currentDate; 
  });

  const sortTournamentsByDate = (tournamentsList) => {
    return tournamentsList.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return sortAscending ? dateA - dateB : dateB - dateA; 
    });
  };

  const sortedOngoingTournaments = sortTournamentsByDate(ongoingTournaments);
  const sortedPastTournaments = sortTournamentsByDate(pastTournaments);
  const sortedAllTournaments = sortTournamentsByDate(tournaments);

  return (
    <div className="w-full mx-auto">
      {/* Tab navigation */}
      <div className="flex justify-around pb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'ongoing-tournaments' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('ongoing-tournaments')}
        >
          Ongoing Tournaments
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'past-tournaments' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('past-tournaments')}
        >
          Past Tournaments
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'all-tournaments' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('all-tournaments')}
        >
          All Tournaments
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button 
          className="py-2 px-4 bg-customGray text-white rounded hover:bg-gray-600"
          onClick={() => setSortAscending(prev => !prev)} 
        >
          Sort by Date {sortAscending ? '↓' : '↑'}
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === 'ongoing-tournaments' && (
              <div>
                <div className="flex flex-wrap justify-center items-center gap-6">
                  {sortedOngoingTournaments.length > 0 ? (
                    sortedOngoingTournaments.map(tournament => (
                      <AdminTournamentCards 
                        key={tournament._id}
                        tournament={tournament}
                      />
                    ))
                  ) : (
                    <p>No ongoing tournaments available</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'past-tournaments' && (
              <div>
                <div className="flex flex-wrap justify-center items-center gap-6">
                  {sortedPastTournaments.length > 0 ? (
                    sortedPastTournaments.map(tournament => (
                      <AdminTournamentCards 
                        key={tournament._id}
                        tournament={tournament}
                      />
                    ))
                  ) : (
                    <p>No past tournaments available</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'all-tournaments' && (
              <div>
                <div className="flex flex-wrap gap-6">
                  {sortedAllTournaments.length > 0 ? (
                    sortedAllTournaments.map(tournament => (
                      <AdminTournamentCards 
                        key={tournament._id}
                        tournament={tournament}
                      />
                    ))
                  ) : (
                    <p>No tournaments available</p>
                  )}
                </div>

                {/* Tournament creation link */}
                <Link to="/create-tournament">
                  <div className="flex justify-center items-center w-[28rem] h-[31.5rem] rounded-lg bg-transparent border border-customGray border-opacity-40 border-dashed bg-opacity-30">
                    <div className="flex flex-col w-[28rem] justify-center items-center gap-6">
                      <BsPlusCircleDotted className="flex text-6xl text-customGray" />
                      <div className="font-light helvetica-neue text-customGray text-xl">Create New Tournament</div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentSubtabs;
