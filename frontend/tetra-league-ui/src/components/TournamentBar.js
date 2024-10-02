//Need to connect to backend API
import React from 'react';
import RegistrationButtons from '../components/RegistrationButtons';

const TournamentBar = () => {
    return (
      <div className="flex w-full h-52 rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
          {/*Header Image*/}
          <div className="w-72 h-full justify-center items-center">
            <img
              src="/Online Images/Puyo Tournament Pic.jpg"
              alt="Tournaments Header Pic"
              className="w-full h-full object-cover">
            </img>
          </div>

          {/*Text Container*/}
          <div className="flex w-full justify-between ml-6">

            {/*Tournament Name & Date*/}
            <div className="flex flex-col flex-none basis-2/3 justify-center mr-6">
              <div className="flex font-medium font-sans-serif customGray text-3xl mb-4"> Puyo Puyo Tetris 2 Tournament</div>
              <div className="flex helvetica-neue customGray mb-4">7 Sept, 2024 19:00</div>

              <div className="flex items-center mb-4">
                <div className="flex helvetica-neue text-center mr-2">Organised by:</div>
                <img 
                  src="Online Images/nintendo-switch.png"
                  alt="Organiser Profile Pic"
                  className="w-8 h-8"
                ></img>
                <div className="flex helvetica-neue text-center text-customGray pl-2">Nintendo Of America</div>
              </div>

              <div className="flex items-center">
                <div className="flex helvetica-neue text-center">Mimimum Rank:</div>
                <div className="flex font-sans-serif text-center text-xl text-customBronze pl-2">BRONZE</div>
              </div>

            </div>
      
            <div className="flex w-40 mt-auto pr-6 pb-6">
              <RegistrationButtons />
            </div>

        </div>
      </div>

  );
};

export default TournamentBar;
