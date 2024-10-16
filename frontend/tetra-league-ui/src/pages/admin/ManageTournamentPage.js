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
  const [tournamentEnded, setTournamentEnded] = useState(false);
  const [winner, setWinner] = useState(null);

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

  const fetchTournamentandMatchData = async () => {
    try {
      const tournamentResponse = await fetchTournamentData();
      if (tournamentResponse) {
        const tournamentData = tournamentResponse.data;
        console.log("Fetched tournament data:", tournamentData);
        updateTournamentData(tournamentData);
        if (!tournamentResponse.ended) {
          setTournamentEnded(true);
          setWinner(tournamentResponse.winnerId);
        }
      }
  
      if (!tournamentResponse.ended) {
        await fetchMatches();
      }
    } catch (error) {
      console.error('Error fetching tournament and matches:', error);
    }
  }

  const handleAdvanceTournament = async () => {
    const token = Cookies.get('token');

    if (!token) {
      console.error("Token is missing");
      return;
    }

    const confirmAdvance = window.confirm("Are you sure you want to advance to the next round?");
    if (!confirmAdvance) {
      return;
    }

    const roundCompleted = await CompleteRoundMatches();
    if (!roundCompleted) {
      alert("Must complete Current round before advancing");
      return;
    }

    await advanceTournament();

    setRoundComplete(false);
    await fetchTournamentandMatchData();
  }

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

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Attempting to advance to next round of Tournament with ID:", id);
      const advanceResponse = await axios.post(`http://localhost:8080/api/tournaments/${id}/rounds/${currentRoundNumber}/advance`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Successfully advanced to next round of Tournament with ID:", id);
      console.log(advanceResponse.data);
      updateCurrentRoundNumber(prevRoundNumber => prevRoundNumber + 1);

    } catch (error) {
      console.error('Error advancing to next round of tournament:', error);
    }
  };

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
        const completeMatchResponse = await axios.put(`http://localhost:8080/api/tournaments/${id}/matches/${matchId}/result`, winnerId, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain',
          },
        });
        console.log(completeMatchResponse);
        console.log("successfully updated winner for match");
        alert("successfully updated winner for match")
      } catch (error) {
      console.error('Error completing match with Id:', error);
      }
    }
  };

  const getMatch = async (matchId) => {
    const token = Cookies.get('token');

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("attempting to fetch match with match ID:", matchId);
      const matchResponse = await axios.get(`http://localhost:8080/api/tournaments/${id}/matches/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const matchData = matchResponse.data;
      console.log(matchData);
      return matchData;
    } catch (error) {
    console.error('Error fetching match', error);
    return null;
    }
  }

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
          handleAdvanceTournament={handleAdvanceTournament}
          completeMatch={completeMatch}
          getMatch={getMatch}
          tournamentEnded={tournamentEnded}
          winner={winner}
        />
      </div>

    </main>
  );
};

export default ManageTournamentPage;