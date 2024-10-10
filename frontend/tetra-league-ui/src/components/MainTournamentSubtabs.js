import React, { useEffect, useState } from 'react';
import TournamentCardsSmall from '../components/TournamentCardsSmall';
import Cookies from 'js-cookie';

const MainTournamentSubtabs = ({ username }) => {
  const [activeTab, setActiveTab] = useState('My-Events');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true); 
      try {
        const token = Cookies.get('token'); 
        let response;
        console.log('Fetching tournaments for user:', username);

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        if (activeTab === 'My-Events') {
            if (username) {
                response = await fetch(`http://localhost:8080/api/users/${username}/tournaments`, { headers });
            } else {
                console.error('Username is required for fetching tournaments.');
                return; 
            }
        } else {
            response = await fetch('http://localhost:8080/api/tournaments', { headers });
        }


        if (!response.ok) {
          const errorText = await response.text(); 
          console.error('Response error:', response.status, errorText); 
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTournaments();
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
              className={`py-2 px-4 ${activeTab === 'My-Events' ? 'border-b-2 border-blue-500' : ''} cursor-pointer hover:text-yellow-500`}
              onClick={() => handleTabClick('My-Events')}
            >
              My Events
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
            {(activeTab === 'My-Events' || activeTab === 'All-Tournaments') && (
              <div>
                <div className="flex flex-wrap w-full gap-6">
                  {tournaments.map((tournament) => (
                    <TournamentCardsSmall key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainTournamentSubtabs;
