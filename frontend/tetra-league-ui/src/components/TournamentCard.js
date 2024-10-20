import React from 'react';
import Card from 'react-bootstrap/Card'; 
import RegistrationButtons from '../components/RegistrationButtons';
import { useParams } from 'react-router-dom'; // Assumes you're using react-router for routing
import axios from 'axios';

const TournamentCard = ({ id, name, startDate, endDate, prizePool, rank, imageUrl, showRegistrationButtons, username }) => {
    const formatDateTime = (date) => {
        return new Date(date).toLocaleString();
    };

    // Update the default image URL
    const defaultImageUrl = '/Misc Design/tetrisdefault.jpg';

    return (
      <div className="flex mt-10">
        <Card className="w-full rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
          <Card.Body>
            <div className="flex h-72 justify-center">
              <img
                src={imageUrl || defaultImageUrl}  
                alt="Tournaments Header Pic"
                className="object-cover w-full h-full justify-center"
              />
            </div>
            <div className="flex w-full p-6">
              <div className="flex flex-col flex-none basis-1/2 mr-6">
                <div className="flex font-medium font-sans-serif customGray text-4xl mb-4">
                  {name}
                </div>
                <div className="flex font-normal helvetica-neue customGray text-lg">
                  Starts on: {formatDateTime(startDate)}
                </div>
                <div className="flex font-normal helvetica-neue customGray text-lg">
                  Ends on: {formatDateTime(endDate)} 
                </div>
              </div>
              <div className="flex border-l-2 border-customGray border-opacity-30"></div>
              <div className="flex flex-col justify-center items-center ml-8 mr-8">
                <div className="flex font-thin helvetica-neue text-center text-sm pb-2">
                  Prize Pool
                </div>
                <div className="flex font-sans-serif text-center text-customGray text-4xl pb-6">
                  ${prizePool}
                </div>
              </div>
              <div className="flex border-l-2 border-customGray border-opacity-30"></div>
              <div className="flex flex-col justify-center items-center ml-8 mr-8">
                <div className="flex font-thin helvetica-neue text-center text-sm pb-2">
                  Minimum Rank
                </div>
                <div className="flex font-sans-serif text-center text-4xl text-customBronze pb-6">
                  {rank}
                </div>
              </div>
              <div className="flex border-l-2 border-customGray border-opacity-30"></div>
              <div className="flex w-full pl-6">
                {showRegistrationButtons && <RegistrationButtons username={username} tournamentId={id} />}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
};

export default TournamentCard;
