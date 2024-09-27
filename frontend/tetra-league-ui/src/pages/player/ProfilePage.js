import Navbar from '../../components/UserNavbar';
import React, { useState } from 'react';
import '../../styles/ProfilePage.css'; //styling the profile page

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: 'Player username',
    name: 'Player name',
    email: 'Player email',
    playerId: '01487234',
    dateOfBirth: '03/09/1989',
    location: 'SINGAPORE',
    password: '************',
  });

  //input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 //editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <Navbar />
      <div className="w-1/2 p-8 relative">
        <div className="absolute -top-80 left-0">
          <img src="/Headers/Profile Header.png" alt="Profile" className="w-72 md:w-6/12 mb-8" style={{ width: '350px' }} />
          <img src="/Misc Design/profile pic.png" alt="Profile" className="w-72 md:w-6/12 mt-8" style={{ width: '350px' }} />
        </div>
      </div>

      <div className="p-8 bg-white rounded-lg shadow-md style={{ width: '1000px' }} mt-28">
        <form className='space-y-4'>
          <div className="flex flex-col w-full">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Player ID:
              <input
                type="text"
                name="playerId"
                value={formData.playerId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>
          </div>
        </form>

        <div className="mt-10">
          <button className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg" onClick={toggleEdit}>
            Edit
          </button>
        </div>

      </div>
    </main>
  );
};

export default ProfilePage;
