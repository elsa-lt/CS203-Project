import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/UserNavbar';
import axios from 'axios';
import Cookies from 'js-cookie';

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log("Authorization Token:", token);

    const fetchTournamentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tournaments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTournament(response.data);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, [id]);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();
    return `${start} - ${end}`;
  };

  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex flex-col min-h-screen w-full mt-14 ml-5 mr-5">
        <div className="flex flex-grow-0 w-30 h-10">
          <img 
            src="/Headers/Tournaments Header.png"
            alt="Tournaments Header"
            className="w-30 h-10"
          />
        </div>

        <div className="mt-6">
          <hr className="w-full border-customGray border-opacity-30"/>
        </div>

        <div className="flex flex-col p-6">
          <h1 className="text-4xl font-semibold">{tournament.name}</h1>
          <p className="mt-4 text-lg">Date: {formatDateRange(tournament.startDate, tournament.endDate)}</p>
          <p className="mt-2 text-lg">Minimum Rank: {tournament.minElo}</p>
          <p className="mt-2 text-lg">Maximum Rank: {tournament.maxElo}</p>
          <p className="mt-2 text-lg">Prize Pool: ${tournament.prizePool}</p>
        </div>
      </div>
    </main>
  );
};

export default TournamentDetails;
