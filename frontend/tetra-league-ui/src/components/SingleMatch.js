import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SingleMatch = ({ match, matchboxHeight, padding, isSelectingWinners, completeMatch, getMatch }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [player1Id, setPlayer1Id] = useState(null);
  const [player2Id, setPlayer2Id] = useState(null);
  const [player1UserName, setPlayer1Username] = useState(null);
  const [player2UserName, setPlayer2Username] = useState(null);
  const [winnerId, setWinnerId] = useState(null);

  useEffect(() => {

    const fetchMatchData = async () => {
      const matchData = await getMatch(match);

      if (matchData) {
        setPlayer1Id(matchData.player1Id);
        setPlayer2Id(matchData.player2Id);

        const token = Cookies.get('token');

        if (token) {
          try {
            const player1InfoResponse = await axios.get(`http://localhost:8080/api/users/${matchData.player1Id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const { username: fetchedUsernamePlayer1 } = player1InfoResponse.data; 
            setPlayer1Username(fetchedUsernamePlayer1); 
            console.log("successfully fetched and set username for player 1 with id:", matchData.player1Id);
    
            const player2InfoResponse = await axios.get(`http://localhost:8080/api/users/${matchData.player2Id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const { username: fetchedUsernamePlayer2 } = player2InfoResponse.data; 
            setPlayer2Username(fetchedUsernamePlayer2); 
            console.log("successfully fetched and set username for player 2 with id:", matchData.player2Id);
    
          } catch (error) {
            console.error('Error fetching username for players:', error);
          }
        } else {
          console.error("Token is missing");
        }
      }
    };

    fetchMatchData();
  }, [match]);


  const handleSelectPlayer1 = () => {
    if (isSelectingWinners) {
      setSelectedPlayer(selectedPlayer === 'player1' ? null : 'player1');
      setWinnerId(player1Id);
      completeMatch(match.id, player1Id);
    }
  };

  const handleSelectPlayer2 = () => {
    if (isSelectingWinners) {
      setSelectedPlayer(selectedPlayer === 'player2' ? null : 'player2');
      setWinnerId(player2Id);
      completeMatch(match.id, player2Id);
    }
  };

  
  return (
    <div className="flex">

      <div style={{ padding: `${padding}px 0` }}>
        <div className="flex items-center">
          <svg 
            style={{ height: `${matchboxHeight}px` }}
            className="rounded-lg w-48"
            xmlns="http://www.w3.org/2000/svg">

            <rect 
              x="0"
              y="0"
              width="100%"
              height="50%"
              className={ isSelectingWinners ? 
                `cursor-pointer ${
                selectedPlayer === 'player1' ? "fill-green-500" : 
                selectedPlayer === null ? "fill-customBlue" : 
                "fill-gray-500"}` : "fill-customBlue"}
              onClick={handleSelectPlayer1}
              />
            <rect 
              x="0"
              y="50%"
              width="100%"
              height="50%"
              className={ isSelectingWinners ?
                `cursor-pointer ${
                selectedPlayer === 'player2' ? "fill-green-500" : 
                selectedPlayer === null ? "fill-customRed" : 
                "fill-gray-500"}` : "fill-customRed"}
              onClick={handleSelectPlayer2}
              />

            <text
              x="50%" 
              y="25%" 
              textAnchor="middle" 
              fill="white" 
              fontSize="16" 
            >
              {player1UserName}
            </text>
            
            <text
              x="50%" 
              y="75%" 
              textAnchor="middle" 
              fill="white" 
              fontSize="16" 
            >
              {player2UserName}
            </text>

          </svg>
        </div>
      </div>
    </div>
  );
};

export default SingleMatch;