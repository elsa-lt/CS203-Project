import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function RegistrationButtons({ tournamentId, username }) {
    const [isRegistered, setIsRegistered] = useState(null);

    {/* using boolean */}
    // const checkRegistrationStatus = async () => {
    //     const token = Cookies.get('token');
    //     try {
    //         console.log("fetching registration status for user with username:", username);
    //         const response = await axios.get(`http://localhost:8080/api/tournaments/${tournamentId}/participants/${username}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         console.log("Registration status:", response.data);

    //         setIsRegistered(response.data);
    //     } catch (error) {
    //         console.error('Error checking registration status:', error);
    //     }
    // };

    {/* using RegistrationStatusResponse */}
    const checkRegistrationStatus = async () => {
        const token = Cookies.get('token');
        try {
            console.log("fetching registration status for user with username:", username);
            const response = await axios.get(`http://localhost:8080/api/tournaments/${tournamentId}/participants/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const responseData = response.data
            console.log("Registration status:", responseData);

            setIsRegistered(responseData.isRegistered);
            console.log(isRegistered);
        } catch (error) {
            console.error('Error checking registration status:', error);
        }
    };

    useEffect(() => {
        checkRegistrationStatus();
    }, [tournamentId, username]);

    const handleRegister = async () => {
        if (!isRegistered) {
            const confirmRegistration = window.confirm("Are you sure you want to register?");
            if (confirmRegistration) {
                const token = Cookies.get('token');
                try {
                    await axios.post(`http://localhost:8080/api/users/${username}/joinTournament`, tournamentId, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'text/plain',
                        },
                    });
                    alert("Successfully registered for the tournament!");
                    checkRegistrationStatus();
                } catch (error) {
                    console.error('Error registering for tournament:', error);
                    alert("Failed to register for the tournament. Please try again.");
                }
            }
        } else {
            alert("You are already registered for this tournament.");
        }
    };

    const handleWithdraw = async () => {
        const confirmWithdrawal = window.confirm("Are you sure you want to withdraw?");
        if (confirmWithdrawal) {
            const token = Cookies.get('token');
            try {
                const response = await axios.delete(`http://localhost:8080/api/users/${username}/withdrawTournament/${tournamentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert("Successfully withdrawn from the tournament.");
                checkRegistrationStatus();
            } catch (error) {
                console.error('Error withdrawing from tournament:', error);
                alert("Failed to withdraw from the tournament. Please try again.");
            }
        }
    };

    if (isRegistered === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full gap-2 items-center justify-center">
            {isRegistered ? (
                <div
                    className="flex justify-center items-center font-medium helvetica-neue text-customGray border border-customGray h-11 w-full rounded-full">
                    Registered
                </div>
            ) : (
                <div
                    className="flex justify-center items-center font-medium helvetica-neue bg-customGray text-white h-11 w-full rounded-full cursor-pointer"
                    onClick={handleRegister}>
                    Register
                </div>
            )}
            {isRegistered && (
                <div
                    className="flex justify-center items-center font-medium helvetica-neue text-white bg-customRed h-11 w-full rounded-full cursor-pointer mt-2"
                    onClick={handleWithdraw}>
                    Withdraw
                </div>
            )}
        </div>
    );
}

export default RegistrationButtons;