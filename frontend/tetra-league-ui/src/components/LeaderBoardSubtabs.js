import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LeaderBoardSubtabs = ({ username }) => {
  const [activeTab, setActiveTab] = useState('My-Events');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true); 
      try {
        const token = Cookies.get('token'); 
        let response;
        console.log('Fetching leaderboard for user:', username);

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        if (activeTab === 'Global-Ranking') {
            if (username) {
                response = await fetch(`http://localhost:8080/api/users/${username}/tournaments`, { headers });
            } else {
                console.error('Username is required for fetching tournaments.');
                return; 
            }
        } else if (activeTab === 'Tournament-Ranking') {
            response = await fetch('http://localhost:8080/api/tournaments', { headers });
        }
        else{

        }


        if (!response.ok) {
          const errorText = await response.text(); 
          console.error('Response error:', response.status, errorText); 
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchLeaderboard();
  }, [activeTab, username]); 

  return (
    <div className="w-full mx-auto">
      {loading ? (
        <div>Loading...</div> // Show loading message
      ) : (
        <>
          {/* Tab navigation */}
          <div className="flex justify-around">
            <button
              className={`py-2 px-4 ${activeTab === 'Global-Ranking' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('Global-Ranking')}
            >
              Global Ranking
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'Tournament-Ranking' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('Tournament-Ranking')}
            >
              Tournament Ranking
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'Bracket-Ranking' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('Bracket-Ranking')}
            >
             Bracket Ranking
            </button>
          </div>

          {/* Tab content */}
          <div className="mt-10">
            {(activeTab === 'Tournament-Ranking' || activeTab === 'Bracket-Ranking') && (
              <div>
                {/* <div className="flex flex-wrap w-full gap-6">
                  {tournaments.map((tournament) => (
                    <TournamentCardsSmall key={tournament.id} tournament={tournament} />
                  ))}
                </div> */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderBoardSubtabs;