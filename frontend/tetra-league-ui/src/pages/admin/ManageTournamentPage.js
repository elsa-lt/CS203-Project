import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar'
import ManageTournamentCard from '../../components/ManageTournamentCard';
import { IoChevronBackOutline } from "react-icons/io5";
import ManageTournamentSubtabs from '../../components/ManageTournamentSubtabs';
import Cookies from 'js-cookie';
import axios from 'axios';

const ManageTournamentPage = () => {
  const location = useLocation();
  const { tournament } = location.state || {};
  const { id, started } = tournament;

  const [hasStarted, setHasStarted] = useState(started);
  const [tournamentData, updateTournamentData] = useState(tournament);
  const [currentMatches, updateCurrentMatches] = useState([]); 
  const [allMatches, updateAllMatches] = useState([]); 
  const [currentRoundNumber, updateCurrentRoundNumber] = useState(0);
  const [isSelectingWinners, setIsSelectingWinners] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);

  if (!tournamentData) {
    return <div>No tournament data available.</div>;
  }

  const startAndInitialiseTournament = async () => {
    const started = await startTournament();
    if (started) {
      await fetchMatches();
      updateCurrentRoundNumber(1);
    }
  }

  const handleSelectWinners = () => {
    setIsSelectingWinners(!isSelectingWinners);
  }

  //Function to Start Tournament
  const startTournament = async () => {
    const confirmStart = window.confirm("Are you sure you want to start the tournament?");
    if (confirmStart) {
      const token = Cookies.get('token');
      if (!token) {
        console.error("Token is missing");
        return;
      }
      console.log("token:", token);
    
      try {
        console.log("Attempting to start Tournament with ID:", id);
        const response = await axios.post(`http://localhost:8080/api/tournaments/${id}/start`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const tournamentResponse = await fetchTournamentData();
      
        if (tournamentResponse) {
          const tournamentData = tournamentResponse.data; 
          console.log("Fetched tournament data:", tournamentData);

          setHasStarted(true);
          updateTournamentData(tournamentData);
          alert("Successfully started tournament!");
          console.log("Tournament has successfully started!");
          return true;
        }
        
      } catch (error) {
        console.error('Error starting tournament:', error);
        return false;
      }
    }
  };

  const fetchTournamentData = async () => {
    const token = Cookies.get('token');
  
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Attempting to fetch Tournament with ID:", id);
      const tournamentResponse = await axios.get(`http://localhost:8080/api/tournaments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log("Successfully fetched Tournament with ID:", id);
      return tournamentResponse;

    } catch (error) {
      console.error('Error starting tournament:', error);
      return null;
    }
  };


  const fetchMatches = async () => {
    const token = Cookies.get('token');
  
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Attempting to fetch matches of current round of Tournament with ID:", id);
      const matchResponse = await axios.get(`http://localhost:8080/api/tournaments/${id}/matches`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log("Successfully fetched matches of Tournament with ID:", id);
      console.log(matchResponse.data);
      updateCurrentMatches(matchResponse.data);
      updateAllMatches(prevMatches => [...prevMatches, matchResponse.data]);
    } catch (error) {
      console.error('Error fetching matches of tournament round:', error);
    }
  };


  const CompleteRoundMatches = async () => {
    const token = Cookies.get('token');
  
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Attempting to complete matches of current round of Tournament with ID:", id);
      const completeRoundResponse = await axios.post(`http://localhost:8080/api/tournaments/${id}/rounds/${currentRoundNumber}/complete`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Successfully completed matches of Tournament with ID:", id);
      console.log(completeRoundResponse.data);
      setRoundComplete(true);
      return true;
    } catch (error) {
      console.error('Error completing rounds of tournament round:', error);
      return false;
    }
  };

  const advanceTournament = async () => {
    const token = Cookies.get('token');
  
    const roundCompleted = await CompleteRoundMatches();

    if (roundCompleted) {

      if (!token) {
        console.error("Token is missing");
        return;
      }

      const confirmAdvance = window.confirm("Are you sure you want to start the tournament?");
      if (confirmAdvance){
        try {
          console.log("Attempting to advance to next round of Tournament with ID:", id);
          const advanceResponse = await axios.post(`http://localhost:8080/api/tournaments/${id}/rounds/${currentRoundNumber}/advance`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log("Successfully advanced to next round of Tournament with ID:", id);
          console.log(advanceResponse.data);
          updateCurrentRoundNumber(currentRoundNumber + 1);
  
          const tournamentResponse = await fetchTournamentData();
          if (tournamentResponse) {
            const tournamentData = tournamentResponse.data; 
            console.log("Fetched tournament data:", tournamentData);
            updateTournamentData(tournamentData);
          }
  
          await fetchMatches();
  
          setRoundComplete(false);
  
        } catch (error) {
          console.error('Error advancing to next round of tournament:', error);
        }
      }
    } else {
      alert("Must complete Current round before advancing");
    }

  };

  //sets winnerID & isCompleted = true for a single match
  const completeMatch = async (matchId, winnerId) => {
    const token = Cookies.get('token');

    if (!token) {
      console.error("Token is missing");
      return;
    }

    const confirmWinner = window.confirm("set player as winner?");
    if (confirmWinner) {
      try {
        console.log("completing match with match ID:", matchId);
        console.log("tournamentId:", id);
        console.log("winnerId:", winnerId);
        const completeMatchResponse = await axios.put(`http://localhost:8080/api/tournaments/${id}/matches/${matchId}/result`, { winnerId }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        console.log(completeMatchResponse);
      } catch (error) {
      console.error('Error fetching username for players:', error);
      }
    }
  };


  //UI
  return (
    <main className="relative flex min-h-screen p-10 overflow-hidden">

    <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-scroll"
        style={{
          backgroundImage: `url('/Background/Gray Background.png')`,
          backgroundAttachment: 'fixed',
          zIndex: -1, 
        }}
      ></div>

      <div className="fixed">
        <AdminNavbar/>
      </div>

      <div className="flex flex-col w-full mt-10">
        <Link 
        to="/admin-tournaments"
        className="flex text-white items-center">
          <IoChevronBackOutline/>
          <div className="ml-1">Back to Tournaments</div>
        </Link>

        <div className="flex pt-6 pb-10 w-full">
          <ManageTournamentCard 
            tournament={tournamentData}
            currentMatches={currentMatches}
            currentRoundNumber={currentRoundNumber}/>
        </div>

        <ManageTournamentSubtabs 
          tournament={tournamentData}
          startAndInitialiseTournament={startAndInitialiseTournament} 
          allMatches={allMatches}
          hasStarted={hasStarted}
          currentRoundNumber={currentRoundNumber}
          handleSelectWinners={handleSelectWinners}
          isSelectingWinners={isSelectingWinners}
          completeMatch={completeMatch}/>
      </div>

    </main>
  );
};

export default ManageTournamentPage;