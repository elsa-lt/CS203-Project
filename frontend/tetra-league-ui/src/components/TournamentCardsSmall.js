import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const TournamentCardsSmall = ({ tournament }) => {
  const navigate = useNavigate();

  function ClickHandler() {
    navigate(`/tournament-details/${tournament.id}`); 
  }

  return (
    <Card className="w-[28rem] rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
      <Card.Body>
        <div className="flex h-72 justify-center">
          <img
            src="/Online Images/Puyo Tournament Pic.jpg"
            alt="Tournaments Header Pic"
            className="object-cover w-full h-full justify-center"
            onClick={ClickHandler} 
          />
        </div>

        <div className="flex w-full p-6">
          <div className="flex flex-col flex-none basis-3/5 mr-6">
            <div
              className="flex font-medium font-sans-serif customGray text-4xl mb-4"
              onClick={ClickHandler}
            >
              {tournament.name}
            </div>
            <div className="flex helvetica-neue customGray mb-4">
              {new Date(tournament.date).toLocaleDateString()} {tournament.time}
            </div>

            <div className="flex items-center">
              <div className="flex helvetica-neue text-center">
                Minimum Rank:
              </div>
              <div className="flex font-sans-serif text-center text-xl text-customBronze pl-2">
                {tournament.rank}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TournamentCardsSmall;
