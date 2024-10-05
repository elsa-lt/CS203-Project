import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminTournamentCards from '../components/AdminTournamentCards';
import { BsPlusCircleDotted } from "react-icons/bs";

const AdminTournamentSubtabs = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('ongoing-tournaments');

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full mx-auto">
      {/* Tab navigation */}
      <div className="flex justify-around pb-6">
        <button
          className={`py-2 px-4
            ${activeTab === 'ongoing-tournaments' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('ongoing-tournaments')}
        >
          Ongoing Tournaments
        </button>
        <button
          className={
            `py-2 px-4 
            ${activeTab === 'All-Tournaments' ? 'border-b-2 border-blue-500' : ''}
            cursor-pointer hover:text-yellow-500`}
          onClick={() => handleTabClick('All-Tournaments')}
        >
          All Tournaments
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-10">
        {activeTab === 'ongoing-tournaments' && (
          <div>
            <div className="flex flex-col justify-center ml-20">
              <div className="flex flex-wrap w-full gap-6">
                <AdminTournamentCards />
                <AdminTournamentCards />
                <AdminTournamentCards />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'All-Tournaments' && (
          <div>
            <div className="flex flex-col w-full">

              <div className="flex w-full ml-20 items-center justify-center">
                <div className="flex flex-wrap gap-6">

                  <AdminTournamentCards />
                  <AdminTournamentCards />
                  <AdminTournamentCards />

                  {/*Create Tournament Box*/}
                  <Link to="/create-tournament">
                    <div className="flex justify-center items-center w-[28rem] h-[31.5rem] rounded-lg bg-transparent border border-customGray border-opacity-40 border-dashed bg-opacity-30">
                      <div className="flex flex-col w-[28rem] justify-center items-center gap-6">
                        <BsPlusCircleDotted className="flex text-6xl text-customGray"/>
                        <div className="font-light helvetica-neue text-customGray text-xl">Create New Tournament</div>
                      </div>
                    </div>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentSubtabs;