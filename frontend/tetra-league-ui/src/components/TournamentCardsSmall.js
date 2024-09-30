import React from 'react';
import Card from 'react-bootstrap/Card';
import RegistrationButtons from '../components/RegistrationButtons';

const TournamentCardsSmall = ({ tournament }) => {
  return (
    <Card className="w-[28rem] rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
      <Card.Body>
        {/* Header Image */}
        <div className="flex h-72 justify-center">
          <img
            src={tournament.imageUrl || "/Online Images/DefaultTournamentPic.jpg"}
            alt={tournament.name}
            className="object-cover w-full h-full justify-center"
          />
        </div>

        {/* Text Container */}
        <div className="flex w-full p-6">
          {/* Tournament Name & Date */}
          <div className="flex flex-col flex-none basis-3/5 mr-6">
            <div className="flex font-medium font-sans-serif customGray text-4xl mb-4">
              {tournament.name}
            </div>
            <div className="flex helvetica-neue customGray mb-4">
              {new Date(tournament.startDate).toLocaleDateString()} {new Date(tournament.startDate).toLocaleTimeString()}
            </div>
            <div className="flex">
              <div className="flex items-center">
                <div className="flex helvetica-neue text-center">
                  Minimum Rank:
                </div>
                <div className="flex font-sans-serif text-center text-xl text-customBronze pl-2">
                  {tournament.minElo}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end items-end mt-auto">
            <RegistrationButtons />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TournamentCardsSmall;
