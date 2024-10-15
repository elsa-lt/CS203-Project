import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function StartButtons({ tournament }) {
    // State to track if the user has registered
    const [hasStarted, sethasStarted] = useState(false);
    const navigate = useNavigate();

    // Handle the button click
    const handleStart = () => {
      sethasStarted(true); // Change the first button to "Registered" and show the second button
    };

    const handleEnd = () => {
      sethasStarted(false); // Reset to "Register" and hide the second button
    };

    const handleManage = () => {
      navigate(`/manage-tournament/${tournament.id}`, { state: { tournament } })
    };

    return (
      <div className="flex flex-col w-full gap-2 items-center justify-center">
        {/*Initial Register Button */}
        {!hasStarted && (
          <div
            className="flex justify-center items-center font-medium helvetica-neue bg-customGray text-white h-11 w-full rounded-full cursor-pointer"
            onClick={handleStart}>
              Start
          </div>
        )}

        {/*Conditionally render 2nd Withdraw Button*/}
        {hasStarted && (
          <div className="flex flex-col w-full gap-2 items-center justify-center">
            <div 
              className="flex justify-center items-center font-medium helvetica-neue text-white bg-customBlue h-11 w-full rounded-full cursor-pointer"
              onClick={handleManage}>
                Manage
            </div>
            <div
              className="flex justify-center items-center font-medium helvetica-neue text-white bg-customRed h-11 w-full rounded-full cursor-pointer"
              onClick={handleEnd}>
                End
            </div>
          </div>
        )}
      </div>
    );
}

export default StartButtons;