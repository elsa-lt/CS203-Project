import React from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';

const CancelModal = ({ isOpen, onClose, tournamentId }) => {

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('token');

            await axios.delete(`http://localhost:8080/api/tournaments/${tournamentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Tournament deleted successfully');
            onClose();
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Are you sure you want to delete this tournament?</h2>
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-200"
                            aria-label="Close"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onClose}
                            className="w-1/2 mr-2 py-2 px-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-yellow-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="w-1/2 ml-2 py-2 px-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-yellow-400"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default CancelModal;
