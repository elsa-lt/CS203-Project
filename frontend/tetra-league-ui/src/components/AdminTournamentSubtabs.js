import React, { useState } from 'react';
import { BsPlusCircleDotted } from "react-icons/bs";
import { Link } from 'react-router-dom';
import AdminTournamentCards from '../components/AdminTournamentCards';

const AdminTournamentSubtabs = ({ tournaments }) => {
  const [activeTab, setActiveTab] = useState('ongoing-tournaments');

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Filter ongoing tournaments based on a condition (e.g., current date)
  const ongoingTournaments = tournaments.filter(tournament => {
    const currentDate = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    return startDate <= currentDate && endDate >= currentDate; // Example condition for ongoing tournaments
  });

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
          className={`py-2 px-4 ${activeTab === 'All-Tournaments' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('All-Tournaments')}
        >
          All Tournaments
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-10">
        {activeTab === 'ongoing-tournaments' && (
          <div>
            <div className="flex flex-wrap gap-6">
              {ongoingTournaments.length > 0 ? (
                ongoingTournaments.map(tournament => (
                  <AdminTournamentCards 
                    key={tournament._id} // Use tournament's unique identifier
                    tournament={tournament} // Pass tournament object
                  />
                ))
              ) : (
                <p>No ongoing tournaments available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'All-Tournaments' && (
          <div>
            <div className="flex flex-col w-full ml-20">
              <div className="flex flex-wrap gap-6">
                {/* Loop over the fetched tournaments and render TournamentCardsSmall */}
                {tournaments.length > 0 ? (
                  tournaments.map(tournament => (
                    <AdminTournamentCards 
                      key={tournament._id} // Use tournament's unique identifier
                      tournament={tournament} // Pass tournament object
                    />
                  ))
                ) : (
                  <p>No tournaments available</p>
                )}
              </div>

              {/* Add tournament creation link */}
              <Link to="/create-tournament">
                <div className="flex justify-center items-center w-[28rem] h-[31.5rem] rounded-lg bg-transparent border border-customGray border-opacity-40 border-dashed bg-opacity-30">
                  <div className="flex flex-col w-[28rem] justify-center items-center gap-6">
                    <BsPlusCircleDotted className="flex text-6xl text-customGray" />
                    <div className="font-light helvetica-neue text-customGray text-xl">Create New Tournament</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentSubtabs;
