import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/UserNavbar';
import Cookies from 'js-cookie';

const MatchHistoryPage = () => {
  const [matches, setMatches] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const userInfoResponse = await axios.get('http://localhost:8080/api/users/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { username: fetchedUsername } = userInfoResponse.data;
        setUsername(fetchedUsername);

        const tournamentsResponse = await axios.get("http://localhost:8080/api/tournaments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMatches(tournamentsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tournaments or username:", err);
        setError('Failed to fetch match history');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading match history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <Navbar />

      <div className="w-1/2 p-8 relative">
        <div className="relative -top-10 left-10 text-center">
          <img src="/Headers/Match History Header.png" alt="Profile" className="w-72 md:w-6/12 -ml-80" style={{ width: '550px' }} />
        </div>
      </div>

      {/* table */}
      <div className="w-full max-w-6xl bg-white opacity-70 rounded-lg shadow-lg p-6 h-[550px] overflow-y-auto -ml-10">
        <table className="table-auto w-full text-left">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-4 py-2 text-lg font-bold"> S.No. </th>
              <th className="px-4 py-2 text-lg font-bold">Tournament</th>
              <th className="px-4 py-2 text-lg font-bold">Date</th>
              <th className="px-4 py-2 text-lg font-bold">Match Rank</th>
              <th className="px-4 py-2 text-lg font-bold">Elapsed time</th>
              <th className="px-4 py-2 text-lg font-bold">Winner <span role="img" aria-label="trophy">🏆</span></th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={match.id} className="bg-gray-50 border-b-2">
                <td className="px-4 py-2">{index+1}</td>
                <td className="px-4 py-2">{match.name}</td>
                <td className="px-4 py-2">
                  {new Date(match.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{match.rank}</td>
                <td className="px-4 py-2">{match.elapsedTime}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span>{match.winner}</span>
                    <span className="text-gray-500 text-sm">{match.winner}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MatchHistoryPage;
