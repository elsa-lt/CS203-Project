import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LeaderBoardSubtabs = ({ username }) => {
  const [activeTab, setActiveTab] = useState('Global-Ranking');
  const [selectedBracket, setSelectedBracket] = useState('GOLD');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBracketChange = (event) => {
    setSelectedBracket(event.target.value);
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('token');
        let response;

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        if (activeTab === 'Global-Ranking') {
          response = await fetch(`http://localhost:8080/api/users/global-ranking`, { headers });
        } else if (activeTab === 'Bracket-Ranking') {
          response = await fetch(`http://localhost:8080/api/users/bracket-ranking/${selectedBracket}`, { headers });
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab, selectedBracket, username]);

  return (
    <div className="w-full mx-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-around">
            <button
              className={`py-2 px-4 ${activeTab === 'Global-Ranking' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('Global-Ranking')}
            >
              Global Ranking
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'Bracket-Ranking' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('Bracket-Ranking')}
            >
              Bracket Ranking
            </button>
          </div>

          {/* Dropdown*/}
          {activeTab === 'Bracket-Ranking' && (
            <div className="mt-4 flex justify-start items-center relative left-20">
              <label htmlFor="bracket-select" className="mr-4">Choose Bracket:</label>
              <select
                id="bracket-select"
                value={selectedBracket}
                onChange={handleBracketChange}
                className="border p-2 rounded"
              >
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="BRONZE">Bronze</option>
              </select>
            </div>
          )}


          <div className="w-full max-w-6xl bg-white opacity-70 rounded-lg shadow-lg p-6 h-[550px] overflow-y-auto ml-20">
            <table className="table-auto w-full text-left">
              <thead className="sticky top-0 bg-white">
                <tr >
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Elo Rating</th>
                  <th className="px-4 py-2">Games Won</th>
                  <th className="px-4 py-2">Games Lost</th>
                  <th className="px-4 py-2">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((player, index) => (
                  <tr key={index} className="text-center bg-gray-50 border-b-2">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{player.username}</td>
                    <td className="px-4 py-2">{player.eloRating}</td>
                    <td className="px-4 py-2">{player.gamesWon}</td>
                    <td className="px-4 py-2">{player.gamesLost}</td>
                    <td className="px-4 py-2">{(player.winRate).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderBoardSubtabs;