import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const AnnouncementModal = ({ isOpen, onClose, onAddAnnouncement }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setBody('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const newAnnouncement = {
        title,
        body,
        timestamp: new Date(),
      };
      onAddAnnouncement(newAnnouncement);
      onClose();
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/3">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            aria-label="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold mb-4 font-press-start text-gray-100">Add New Announcement</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-700 text-gray-200"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="body">
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-700 text-gray-200"
                rows="4"
                placeholder="Enter announcement"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 font-press-start text-gray-800 font-bold rounded-lg hover:bg-yellow-400"
            >
              Add Announcement
            </button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default AnnouncementModal;
