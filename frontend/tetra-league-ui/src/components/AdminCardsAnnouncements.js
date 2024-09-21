import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AnnouncementModal from './AnnouncementModal';

const AdminCardsAnnouncements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const handleAddAnnouncement = (announcement) => {
    setAnnouncements([announcement, ...announcements]);
  };

  return (
    <div className="p-4">
      <div className="relative bg-gray-700 bg-opacity-80 p-10 rounded-lg shadow-md h-96">
        <div className="absolute top-0 left-0 w-full bg-gray-700 p-4 rounded-t-lg shadow-md z-10">
          <h2 className="text-2xl text-gray-100 font-bold mb-4 font-press-start">
            Announcements
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-10 text-gray-100 hover:text-yellow-400 flex items-center space-x-1"
              aria-label="Add Announcement"
            >
              <FaPlus className="text-xl" />
              <span className="text-sm">Add Announcement</span> 
            </button>
          </h2>
        </div>
        <AnnouncementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddAnnouncement={handleAddAnnouncement}
        />
        <div className="pt-20 overflow-y-auto h-full">
          {announcements.map((announcement, index) => (
            <div key={index} className="bg-gray-600 p-4 rounded-lg mb-4">
              <h3 className="text-xl text-yellow-300 font-bold">{announcement.title}</h3>
              <p className="text-gray-200">{announcement.body}</p>
              <p className="text-gray-400 text-sm mt-2">{new Date(announcement.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCardsAnnouncements;
