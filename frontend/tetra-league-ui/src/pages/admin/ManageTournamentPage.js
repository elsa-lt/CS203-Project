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
  const { tournament } = location.state || {}; // Access the tournament object;
  const { id, started } = tournament;

  const [hasStarted, setHasStarted] = useState(started);
  const [tournamentData, updateTournamentData] = useState(tournament);
  const [currentMatches, updateCurrentMatches] = useState([]);
  const [allMatches, updateAllMatches] = useState([]);
  const [currentRoundNumber, updateCurrentRoundNumber] = useState(allMatches.length);
  const [isSelectingWinners, setIsSelectingWinners] = useState(false);

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
        // Attempt to start Tournament
        console.log("Attempting to start Tournament with ID:", id);
        const response = await axios.post(`http://localhost:8080/api/tournaments/${id}/start`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        // Fetch updated tournament data
        const tournamentResponse = await fetchTournamentData();
      
        if (tournamentResponse) {
          const tournamentData = tournamentResponse.data; // Directly access the data
          console.log("Fetched tournament data:", tournamentData);

          // Update states with new data
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

  //Fetch the Tournament
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

  //Fetch the matches of the current round
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

  const handleSelectWinners = () => {
    setIsSelectingWinners(!isSelectingWinners);
  }

  const updateMatchWithWinner = () => {
    
  }

  //UI
  return (
    <main className="relative flex min-h-screen p-10 overflow-hidden">

    <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-scroll"
        style={{
          backgroundImage: `url('/Background/Gray Background.png')`,
          backgroundAttachment: 'fixed',
          zIndex: -1, // Ensure the background stays behind content
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
          isSelectingWinners={isSelectingWinners}/>
      </div>

    </main>
  );
};

export default ManageTournamentPage;


          // // Fetch updated tournament data
          // const tournamentResponse = await fetchTournamentData();
        
          // if (tournamentResponse) {
          //   const tournamentData = tournamentResponse.data; // Directly access the data
          //   console.log("Fetched tournament data:", tournamentData);
  
          //   // Update states with new data
          //   setHasStarted(true);
          //   updateTournamentData(tournamentData);
          //   alert("Successfully started tournament!");
          //   console.log("Tournament has successfully started and current round has been set!");
          // }


  // //Advance the Tournament to next round
  // const advanceTournament = async () => {
  //   const token = Cookies.get('token');
  
  //   if (!token) {
  //     console.error("Token is missing");
  //     return;
  //   }

  //   try {
  //     console.log("Attempting to advance Tournament with ID:", id);
  //     const currentRoundResponse = await axios.post(`http://localhost:8080/api/tournaments/${id}/advance`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Successfully fetched advanced Tournament with ID:", id);
  //     await fetchCurrentRound();
  //   } catch (error) {
  //     console.error('Error advancing tournament:', error);
  //   }
  // };

    // //Advance the Tournament to next round
  // const advanceTournament = async () => {
  //   const token = Cookies.get('token');
  
  //   if (!token) {
  //     console.error("Token is missing");
  //     return;
  //   }

  //   try {
  //     console.log("Attempting to advance Tournament with ID:", id);
  //     const currentRoundResponse = await axios.post(`http://localhost:8080/api/tournaments/${id}/advance`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Successfully fetched advanced Tournament with ID:", id);
  //     await fetchCurrentRound();
  //   } catch (error) {
  //     console.error('Error advancing tournament:', error);
  //   }
  // };