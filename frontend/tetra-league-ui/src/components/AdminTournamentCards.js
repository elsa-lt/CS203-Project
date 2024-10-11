import {React,useState} from 'react';
import Card from 'react-bootstrap/Card';
import StartButtons from './StartButtons'; 
import { FiEdit, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import CancelModal from './CancelModal';

const AdminTournamentCard = ({ tournament }) => {
  const editNavigate = useNavigate();
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);

  const formatDateRange = (start, end) => {
    const startFormatted = new Date(start).toLocaleDateString();
    const endFormatted = new Date(end).toLocaleDateString();
    return `${startFormatted} - ${endFormatted}`;
};

  const {name, startDate, endDate, minElo, maxElo, imageUrl } = tournament;

  const handleEdit = () => {
    editNavigate(`/edit-tournament/${tournament.id}`); 
  };

  const handleOpenModal = (id) => {
    setTournamentId(id); 
    setCancelModalOpen(true); 
  };

  return (
    <Card className="w-[28rem] rounded-lg overflow-hidden bg-white border border-customGray border-opacity-30 bg-opacity-80">
      <Card.Body>
        {/* Header Image */}
        <div className="relative h-72">
        <button
              onClick={() => setCancelModalOpen(true)}
              className="absolute top-3 right-5 text-black hover:text-yellow-400 flex items-center space-x-1"
              aria-label="Delete Tournament"
            >
              <FiX className="text-2xl text-red-500 font-bold ml-auto" onClick={() => handleOpenModal(tournament.id)}/>
            </button>
          
        
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          tournamentId={tournamentId}
        />
          <img
            src={imageUrl || '/Misc Design/tetrisdefault.jpg'} 
            alt={name || 'Tournament'}
            className="object-cover w-[28rem] h-72 justify-center"
          />
        </div>

        {/* Text Container */}
        <div className="flex w-full p-6">
          {/* Tournament Name & Date */}
          <div className="flex flex-col flex-none basis-3/5 mr-6">
            <div className="flex font-medium font-sans-serif customGray text-4xl mb-4">
              {name}
            </div>
            <div className="flex helvetica-neue customGray mb-4">
              {formatDateRange(startDate, endDate)}
            </div>
            <div className="flex">
              <div className="flex items-center">
                <div className="flex helvetica-neue text-center">
                  Minimum Rank:
                </div>
                <div className="flex font-sans-serif text-center text-xl text-customBronze pl-2">
                  {minElo} 
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between">
            <div className="flex justify-end items-center cursor-pointer" onClick={handleEdit}>
              <div className="flex mr-2">Edit</div>
              <FiEdit className="text-2xl" />
            </div>
            <div className="flex w-full justify-end items-end">
              <StartButtons tournament={tournament}/>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminTournamentCard;
