//Need to connect to backend API
import React from 'react';
import Card from 'react-bootstrap/Card';
import StartButtons from '../components/StartButtons'
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const TournamentCardsSmall = () => {
  const editnavigate= useNavigate();
  function HandleEdit(){
    editnavigate('/edit-tournament');
  }
    return (
      <Card className="w-[28rem] rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
        <Card.Body>
          {/*Header Image*/}
          <div className="relative flex h-72">
            <img
              src="/Online Images/Puyo Tournament Pic.jpg"
              alt="Tournaments Header Pic"
              className="object-cover w-full h-full justify-center">
            </img>
          </div>

          {/*Text Container*/}
          <div className="flex w-full p-6">

            {/*Tournament Name & Date*/}
            <div className="flex flex-col flex-none basis-3/5 mr-6">
              <div className="flex font-medium font-sans-serif customGray text-4xl mb-4">
                Puyo Puyo Tetris 2 Tournament
              </div>
              <div className="flex helvetica-neue customGray mb-4">
                7 Sept, 2024 19:00
              </div>

              <div className ="flex">
                <div className="flex items-center">
                  <div className="flex helvetica-neue text-center">
                    Mimimum Rank:
                  </div>
                  <div className="flex font-sans-serif text-center text-xl text-customBronze pl-2">
                    BRONZE 
                  </div>
                </div>
              </div>
            </div>
      
            <div className="flex flex-col w-full justify-between">
                <div className="flex justify-end items-center" on onClick={HandleEdit}>
                  <div className="flex mr-2">Edit</div>
                  <FiEdit className="text-2xl" />
                </div>
                <div className="flex w-full justify-end items-end">
                <StartButtons />
                </div>
            </div>
        </div>
      </Card.Body>
    </Card>

  );
};

export default TournamentCardsSmall;
