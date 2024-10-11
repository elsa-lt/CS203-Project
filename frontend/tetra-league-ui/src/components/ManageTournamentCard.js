import {React} from 'react';
import Card from 'react-bootstrap/Card';

const ManageTournamentCard = ({ tournament = {} }) => {

  const { name, startDate, endDate, imageUrl } = tournament;

  const formatDateRange = (start, end) => {
    const startFormatted = new Date(start).toLocaleDateString();
    const endFormatted = new Date(end).toLocaleDateString();
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <Card className="flex h-44 w-full rounded-lg overflow-hidden bg-white bg-opacity-80">
      <div className="flex w-1/5 h-full justify-center items-center">
        <img 
          src={imageUrl || '/Misc Design/tetrisdefault.jpg'}
          alt={name || 'Tournament Image'}
          className="w-full h-full object-cover">
        </img>
      </div>
      <div className="flex w-full mt-6 mb-6 ml-6 justify-between">
        <div className="flex flex-col h-full w-1/2 justify-center overflow-hidden">
          <div className="flex font-sans-serif text-4xl text-customGray">
            {name}
          </div>
          <div className="flex font-helvetica-neue text-customGray pt-6">
            {formatDateRange(startDate, endDate)}
          </div>
        </div>
        <div className="flex">
          <div className="flex border-l-2 border-customGray border-opacity-30"></div>
          <div className="flex flex-col p-4 items-center justify-center">
            <div className="flex font-helvetica-neue text-center">
              Current Round
            </div>
            {/*currently hardcoded*/}
            <div className="flex font-sans-serif text-4xl text-center pt-2">
              SemiFinals
            </div>
          </div>
          <div className="flex border-l-2 border-customGray border-opacity-30"></div>
          <div className="flex flex-col p-4 items-center justify-center">
            <div className="flex font-helvetica-neue text-center">
              Ongoing Matches
            </div>
            {/*currently hardcoded*/}
            <div className="flex font-sans-serif text-4xl text-center pt-2">
              2
            </div>
          </div>
          <div className="flex border-l-2 border-customGray border-opacity-30"></div>
        </div>
      </div>
      <div className="flex h-full justify-center items-center pl-6 pr-6">
        {/*currently hardcoded*/}
        <div
          className="flex h-11 w-32 justify-center items-center font-medium helvetica-neue text-white bg-customRed rounded-full cursor-pointer"
          >
            End
        </div>
      </div>
    </Card>
  );
};

export default ManageTournamentCard;
