import React, {useState} from 'react';

function TournamentButtons() {
    // State to track if the user has registered
    const [isRegistered, setIsRegistered] = useState(false);
  
    // Handle the button click
    const handleRegister = () => {
      setIsRegistered(true); // Change the first button to "Registered" and show the second button
    };
  
    const handleWithdraw = () => {
      setIsRegistered(false); // Reset to "Register" and hide the second button
    };

    return (
      <div className="flex flex-col w-full gap-2 items-center justify-center">
        {/*Initial Register Button */}
        {!isRegistered && (
          <div 
            className="flex justify-center items-center font-medium helvetica-neue bg-customGray text-white h-11 w-full rounded-full cursor-pointer"
            onClick={handleRegister}>
              Register
          </div>
        )}

        {/*Conditionally render 2nd Withdraw Button*/}
        {isRegistered && (
          <div className="flex flex-col w-full gap-2 items-center justify-center">
            <div 
              className="flex justify-center items-center font-medium helvetica-neue text-customGray border border-customGray h-11 w-full rounded-full">
                Registered
            </div>
            <div
              className="flex justify-center items-center font-medium helvetica-neue text-white bg-customRed h-11 w-full rounded-full cursor-pointer"
              onClick={handleWithdraw}>
                Withdraw
            </div>
          </div>
        )}
      </div>
    );
}

export default TournamentButtons;