import React from 'react';
import Card from 'react-bootstrap/Card'; 
import RegistrationButtons from '../components/RegistrationButtons';

const TournamentCard = ({ name, startDate, endDate, prizePool, minElo, imageUrl }) => {
    const formatDateRange = (start, end) => {
        const startFormatted = new Date(start).toLocaleDateString();
        const endFormatted = new Date(end).toLocaleDateString();
        return `${startFormatted} - ${endFormatted}`;
    };

    return (
      <div className="flex mt-10">
        <Card className="w-full rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
          <Card.Body>
            {/* Header Image */}
            <div className="flex h-72 justify-center">
              <img
                src={imageUrl} 
                alt="Tournaments Header Pic"
                className="object-cover w-full h-full justify-center"
              />
            </div>
            {/* Text Container */}
            <div className="flex w-full p-6">
              {/* Tournament Name & Date */}
              <div className="flex flex-col flex-none basis-1/2 mr-6">
                <div className="flex font-medium font-sans-serif customGray text-4xl mb-4">
                  {name}
                </div>
                <div className="flex font-normal helvetica-neue customGray text-lg">
                  {formatDateRange(startDate, endDate)}
                </div>
              </div>

              {/* Vertical Line Divider */}
              <div className="flex border-l-2 border-customGray border-opacity-30"></div>

              {/* Prize Pool Section */}
              <div className="flex flex-col justify-center items-center ml-8 mr-8">
                <div className="flex font-thin helvetica-neue text-center text-sm pb-2">
                  Prize Pool
                </div>
                <div className="flex font-sans-serif text-center text-customGray text-4xl pb-6">
                  ${prizePool}
                </div>
              </div>

              {/* Vertical Line Divider */}
              <div className="flex border-l-2 border-customGray border-opacity-30"></div>

              {/* Minimum Rank Section */}
              <div className="flex flex-col justify-center items-center ml-8 mr-8">
                <div className="flex font-thin helvetica-neue text-center text-sm pb-2">
                  Minimum Rank
                </div>
                <div className="flex font-sans-serif text-center text-4xl text-customBronze pb-6">
                  {minElo}
                </div>
              </div>

              {/* Register Button */}
              <div className="flex w-full pl-6">
                <RegistrationButtons />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
};

export default TournamentCard;
