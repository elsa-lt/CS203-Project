import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the Add icon

const AdminCardsAnnouncements = () => {
  const handleAddAnnouncement = () => {
    alert("TO DO");
  };

  return (
    <div className="p-4">
      <div className="relative bg-gray-700 bg-opacity-80 p-10 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl text-gray-100 font-bold font-press-start">
            Announcements
          </h2>
          <button 
            onClick={handleAddAnnouncement}
            className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400"
            aria-label="Add Announcement"
          >
            <FaPlus className="text-xl" />
            <span className="text-sm font-press-start">Add Announcement</span>
          </button>
        </div>
        <p className="text-yellow-500 text-lg font-press-start">
          This is an announcement!
        </p>
      </div>
    </div>
  );
};

export default AdminCardsAnnouncements;
