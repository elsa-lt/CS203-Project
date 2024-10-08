import React, { useState, useEffect } from 'react';
import Navbar from '../../components/UserNavbar';
import MainTournamentSubtabs from '../../components/MainTournamentSubtabs';
import Cookies from 'js-cookie';
import axios from 'axios';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [username, setUsername] = useState(''); // State for username

  useEffect(() => {
      const token = Cookies.get('token');

      const fetchTournamentsAndUsername = async () => {
          try {
              // Fetch user information (username)
              const userInfoResponse = await axios.get('http://localhost:8080/api/users/info', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              const { username: fetchedUsername } = userInfoResponse.data;
              setUsername(fetchedUsername); // Set username

              // Fetch tournaments
              const tournamentsResponse = await axios.get("http://localhost:8080/api/tournaments", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });

              setTournaments(tournamentsResponse.data);
          } catch (error) {
              console.error("Error fetching tournaments or username:", error);
          }
      };

      if (token) {
          fetchTournamentsAndUsername();
      } else {
          console.error("Token is missing");
      }
  }, []);

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

        <div className="mt-6 mb-6">
          <hr className="w-full border-customGray border-opacity-30"/>
        </div>

        {/* Pass the username to MainTournamentSubtabs */}
        <MainTournamentSubtabs username={username} tournaments={tournaments} />
      </div>
    </main>
  );
};

export default TournamentsPage;
