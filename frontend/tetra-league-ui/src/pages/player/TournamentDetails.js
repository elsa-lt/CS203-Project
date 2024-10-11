import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/UserNavbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import TournamentCard from '../../components/TournamentCard';
import TournamentSubTabs from '../../components/TournamentSubTabs';

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    const fetchUserIdAndTournamentDetails = async () => {
      try {
        // Fetch user ID and username
        const userInfoResponse = await axios.get('http://localhost:8080/api/users/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id: fetchedUserId, username: fetchedUsername } = userInfoResponse.data; 
        setUsername(fetchedUsername); 

        const tournamentResponse = await axios.get(`http://localhost:8080/api/tournaments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTournament(tournamentResponse.data);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
        setError('Failed to fetch tournament details.');
      }
    };

    if (token) {
      fetchUserIdAndTournamentDetails();
    } else {
      console.error("Token is missing");
    }
  }, [id]);

  if (error) {
    return <div className="text-red-600">{error}</div>; 
  }

  if (!tournament) {
    return <div>Loading...</div>;
  }

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

        <TournamentCard 
          id={tournament.id} 
          name={tournament.name} 
          startDate={tournament.startDate} 
          endDate={tournament.endDate} 
          prizePool={tournament.prizePool} 
          minElo={tournament.minElo} 
          imageUrl={tournament.imageUrl}
          username={username} // Pass the username to the TournamentCard
          showRegistrationButtons={true} 
        />
        
        <TournamentSubTabs 
          tournamentId={tournament.id}
        />
      </div>
    </main>
  );
};

export default TournamentDetails;
