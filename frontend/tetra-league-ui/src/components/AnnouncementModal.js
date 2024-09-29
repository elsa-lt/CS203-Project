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
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-press-start text-black mb-7 mt-7">New Announcement</h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-200"
              aria-label="Close"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-lg bg-white text-gray-200"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="body">
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 rounded-lg bg-white text-gray-200"
                rows="4"
                placeholder="Enter announcement"
                style={{ width: '430px', height: '150px', border: '0.5px solid #000' }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-700 font-press-start text-white font-bold rounded-lg hover:bg-yellow-400"
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
