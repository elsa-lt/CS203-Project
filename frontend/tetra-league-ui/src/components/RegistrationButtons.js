import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function RegistrationButtons({ tournamentId, username }) {
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            const token = Cookies.get('token');
            try {
                console.log("Checking registration status for:", tournamentId, username);
                const response = await axios.get(`http://localhost:8080/api/tournaments/${tournamentId}/participants/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("API Response:", response.data);
                setIsRegistered(response.data.isRegistered);
            } catch (error) {
                console.error('Error checking registration status:', error);
            }
        };

        if (username && tournamentId) {
            checkRegistrationStatus();
        }
    }, [tournamentId, username]);

    const handleRegister = async () => {
        const confirmRegistration = window.confirm("Are you sure you want to register?");
        if (confirmRegistration) {
            const token = Cookies.get('token');
            try {
                console.log("Join tournament for:", tournamentId, username);
                await axios.post(`http://localhost:8080/api/users/${username}/joinTournament`, tournamentId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'text/plain',
                    },
                });
                setIsRegistered(true);
            } catch (error) {
                console.error('Error registering for tournament:', error);
                alert("Failed to register for the tournament. Please try again.");
            }
        }
    };

    const handleWithdraw = async () => {
        const confirmWithdrawal = window.confirm("Are you sure you want to withdraw?");
        if (confirmWithdrawal) {
            const token = Cookies.get('token');
            try {
                const response = await axios.post(`http://localhost:8080/api/users/${username}/withdrawTournament`, { tournamentId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert(response.data); // Show success message from server
                setIsRegistered(false);
            } catch (error) {
                console.error('Error withdrawing from tournament:', error);
                alert("Failed to withdraw from the tournament. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col w-full gap-2 items-center justify-center">
            {!isRegistered ? (
                <div 
                    className="flex justify-center items-center font-medium helvetica-neue bg-customGray text-white h-11 w-full rounded-full cursor-pointer"
                    onClick={handleRegister}>
                    Register
                </div>
            ) : (
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

export default RegistrationButtons;
