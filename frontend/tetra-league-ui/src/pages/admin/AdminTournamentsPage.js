import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import AdminTournamentSubtabs from '../../components/AdminTournamentSubtabs';
import Cookies from 'js-cookie';
import axios from 'axios';

const AdminTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = Cookies.get('token'); 
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    const fetchTournamentsAndUsername = async () => {
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
                }
            });

            setTournaments(tournamentsResponse.data);
        } catch (error) {
          console.error('Error fetching tournaments:', error);
        }

        if (token) {
            fetchTournamentsAndUsername();
        } else {
            console.error("Token is missing");
            setLoading(false);
        }
      }
  }, []);

  return (
    <main
      className="flex min-h-screen w-full bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="fixed">
        <AdminNavbar />
        <AdminSidebar />
      </div>

      <div className="flex flex-col min-h-screen w-full mt-20 ml-72 mr-12">
        <div className="flex flex-grow-0 w-30 h-10">
          <img
            src="/Headers/Tournaments Header.png"
            alt="Tournaments Header"
            className="w-30 h-10"
          />
        </div>

        <div className="mt-6 mb-6">
          <hr className="w-full border-customGray border-opacity-30" />
        </div>

        <div className="flex w-full justify-center items-center">
          <AdminTournamentSubtabs tournaments={tournaments} loading={loading} />
        </div>
      </div>
    </main>
  );
};

export default AdminTournamentsPage;
