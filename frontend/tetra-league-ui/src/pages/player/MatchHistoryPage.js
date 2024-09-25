import React from 'react';
import Navbar from '../../components/UserNavbar'; 

const MatchHistoryPage = () => {
  const matches = [
    {
      id: 1,
      tournament: 'Tetris Battleground',
      date: 'Sept 6, 2024',
      rank: 25,
      elapsedTime: '02:01:56',
      difficulty: 1,
      winner: {
        name: 'John Goh',
        time: '02:50:03',
      },
    },
    {
      id: 2,
      tournament: 'Block Showdown',
      date: 'Sept 10, 2024',
      rank: 58,
      elapsedTime: '02:00:01',
      difficulty: 2,
      winner: {
        name: 'Li Yuchen',
        time: '02:45:23',
      },
    },
    {
      id: 3,
      tournament: 'Tetris Grand Challenge',
      date: 'Sept 15, 2024',
      rank: 156,
      elapsedTime: '01:03:56',
      difficulty: 3,
      winner: {
        name: 'Elsa Lee',
        time: '02:02:34',
      },
    },
    {
    id: 4,
      tournament: 'Tetris Championship',
      date: 'Sept 6, 2024',
      rank: 25,
      elapsedTime: '02:01:56',
      difficulty: 1,
      winner: {
        name: 'Ian H.',
        time: '02:50:03',
      },
    },
    {
      id: 5,
      tournament: 'CTUK 2024',
      date: 'Sept 10, 2024',
      rank: 58,
      elapsedTime: '02:00:01',
      difficulty: 2,
      winner: {
        name: 'Gerald',
        time: '02:45:23',
      },
    },
    {
      id: 6,
      tournament: 'Classic Tetris Championship',
      date: 'Sept 15, 2024',
      rank: 156,
      elapsedTime: '01:03:56',
      difficulty: 3,
      winner: {
        name: 'Durga C.',
        time: '02:02:34',
      },
    },
    {
      id: 7,
      tournament: 'CWTC Tetris Challenge',
      date: 'Sept 15, 2024',
      rank: 156,
      elapsedTime: '01:03:56',
      difficulty: 3,
      winner: {
        name: 'Varidhi G.',
        time: '02:02:34',
      },
    },
    {
      id: 8,
      tournament: 'Puyo Puyo Tetris Challenge',
      date: 'Sept 15, 2024',
      rank: 156,
      elapsedTime: '01:03:56',
      difficulty: 3,
      winner: {
        name: 'Claudia',
        time: '02:02:34',
      },
    },
  ];

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <Navbar />

        <div className="w-1/2 p-8 relative">
        <div className="relative -top-10 left-10 text-center">
          <img src="/Headers/Match History Header.png" alt="Profile" className="w-72 md:w-6/12 -ml-80"  style={{ width: '550px' }} />
          </div>
          </div>

      {/* table */}
      <div className="w-full max-w-6xl bg-white opacity-70 rounded-lg shadow-lg p-6 h-[550px] overflow-y-auto -ml-10">
        <table className="table-auto w-full text-left">
          <thead className="sticky top-0 bg-white">
            <tr>
            <th className="px-4 py-2 text-lg font-bold"> </th>
              <th className="px-4 py-2 text-lg font-bold">Tournament</th>
              <th className="px-4 py-2 text-lg font-bold">Date</th>
              <th className="px-4 py-2 text-lg font-bold">Your rank</th>
              <th className="px-4 py-2 text-lg font-bold">Elapsed time</th>
              <th className="px-4 py-2 text-lg font-bold">Difficulty</th>
              <th className="px-4 py-2 text-lg font-bold">Winner <span role="img" aria-label="trophy">🏆</span></th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="bg-gray-50 border-b-2">
                <td className="px-4 py-2">{match.id}</td>
                <td className="px-4 py-2">{match.tournament}</td>
                <td className="px-4 py-2">{match.date}</td>
                <td className="px-4 py-2">{match.rank}</td>
                <td className="px-4 py-2">{match.elapsedTime}</td>
                <td className="px-4 py-2">
                  {Array(match.difficulty)
                    .fill('⭐')
                    .map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span>{match.winner.name}</span>
                    <span className="text-gray-500 text-sm">{match.winner.time}</span>
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

