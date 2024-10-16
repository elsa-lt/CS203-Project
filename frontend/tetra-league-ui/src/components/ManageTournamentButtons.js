import React, { useState } from 'react';

function ManageTournamentButtons({ 
  startAndInitialiseTournament,
  hasStarted,
  handleSelectWinners,
  isSelectingWinners,
  handleAdvanceTournament }) {

  return (
    <div className="flex gap-6">

    <div 
        className="flex justify-center items-center font-medium helvetica-neue bg-customBlue text-white h-11 pl-6 pr-6 rounded-full cursor-pointer"
        onClick={handleSelectWinners}>
        {isSelectingWinners ? "Selecting Winners" : "Select Winners"}
      </div>

      <div 
        className="flex justify-center items-center font-medium helvetica-neue bg-customBlue text-white h-11 pl-6 pr-6 rounded-full cursor-pointer"
        onClick={handleAdvanceTournament}>
        Advance
      </div>

      {!hasStarted && (
        <div 
          className={`flex justify-center items-center font-medium helvetica-neue ${hasStarted ? "bg-customBlue" : "bg-customRed"} text-white h-11 w-40 rounded-full cursor-pointer`}
          onClick={startAndInitialiseTournament}>
          {/*Initial Register Button */}
          Start
        </div>
      )}

    </div>
  )
}

export default ManageTournamentButtons;