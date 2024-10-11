import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar'
import ManageTournamentCard from '../../components/ManageTournamentCard';
import { IoChevronBackOutline } from "react-icons/io5";
import ManageTournamentSubtabs from '../../components/ManageTournamentSubtabs';

const ManageTournamentPage = () => {
  const location = useLocation();
  const { tournament } = location.state || {}; // Access the tournament object;

  if (!tournament) {
    return <div>No tournament data available.</div>;
  }

  return (
    <main
      className="flex min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/Background/Gray Background.png')`}}>

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
          <ManageTournamentCard tournament={tournament}/>
        </div>

        <ManageTournamentSubtabs/>
      </div>

    </main>
  );

};

export default ManageTournamentPage;