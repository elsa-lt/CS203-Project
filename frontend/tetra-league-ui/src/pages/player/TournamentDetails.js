import React, { useEffect, useState } from 'react';
import Navbar from '../../components/UserNavbar';
import TournamentCard from '../../components/TournamentCard';
import TournamentSubTabs from '../../components/TournamentSubTabs';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const TournamentDetails = () => {
  const { id } = useParams(); // Get the tournament ID from the URL
  const [tournament, setTournament] = useState(null); // State to hold tournament details

  useEffect(() => {
    // Fetch the tournament details from the backend API
    axios.get(`/api/tournaments/${id}`)
      .then(response => setTournament(response.data)) // Set the tournament state with the fetched data
      .catch(error => console.error("Error fetching tournament:", error));
  }, [id]);

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

        {tournament ? ( // Check if tournament data is available
          <TournamentCard tournament={tournament} />
        ) : (
          <div>Loading tournament details...</div> // Show a loading message while fetching
        )}

        <div className="flex mt-10">
          <TournamentSubTabs />
        </div>
      </div>
    </main>
  );
};

export default TournamentDetails;
