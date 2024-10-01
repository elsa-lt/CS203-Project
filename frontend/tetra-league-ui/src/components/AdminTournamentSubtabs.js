import React, { useState } from 'react';
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
      <div className="flex justify-around">
        <button
          className={`py-2 px-4
            ${activeTab === 'My-Events' ? 'border-b-2 border-blue-500' : ''}
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
            <div className="flex flex-col w-full justify-between">

              <div className="flex flex-wrap items-center justify-center w-full gap-6">
                <AdminTournamentCards />
                <AdminTournamentCards />
                <AdminTournamentCards />
              </div>

            </div>
          </div>
        )}

        {activeTab === 'All-Tournaments' && (
          <div>

            <div className="flex flex-col w-full justify-between">

              <div className="relative flex items-center z-0 mb-10">
                <div className = "flex flex-grow-0 w-30 h-10">
                  <img
                    src="/Headers/Sub Title Bar.png"
                    alt="Sub Title Bar"
                    className="w-30 h-10">
                  </img>
                  <div className="absolute flex font-sans-serif text-white text-lg ml-8 mt-1">
                    FEATURED TOURNAMENTS
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center w-full gap-6">
                <AdminTournamentCards />
                <AdminTournamentCards />
                <AdminTournamentCards />

                {/*Create Tournament Box*/}
                <div className="w-[28rem] h-[31.5rem] rounded-lg overflow-hidden bg-white border border-customGray border-opacity-40 border-dashed bg-opacity-30">
                  <div className="flex justify-center items-center">
                    <BsPlusCircleDotted className="text-6xl text-customGray text-opacity-30"/>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center z-0 mt-10 mb-10">
                <div className = "flex flex-grow-0 w-30 h-10">
                  <img
                    src="/Headers/Sub Title Bar.png"
                    alt="Sub Title Bar"
                    className="w-30 h-10">
                  </img>
                  <div className="absolute flex font-sans-serif text-white text-lg ml-8 mt-1">
                    ALL TOURNAMENTS
                  </div>
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