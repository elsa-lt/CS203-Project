import Navbar from '../../components/UserNavbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Ensure you're using js-cookie for token management
import '../../styles/ProfilePage.css'; // Styling the profile page
import { useParams } from 'react-router-dom';  // For dynamic route parameter

const ProfilePage = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    playerId: '',  
    dateOfBirth: '',
    location: '',
    password: '',
  });

  //const { userId } = useParams();  
  const userId = '66f261f85d07104dfa628195';  
  
  useEffect(() => {
    const token = Cookies.get('token');  // Get token from cookies
    console.log("Authorization Token:", token);
    console.log("userID:", userId);
    console.log('Fetching user data...');
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);  // Set the fetched data to formData state
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId && token) {
      fetchUserDetails();  // Fetch user data only if both userId and token exist
    } else {
      console.error("User ID or Token is missing");
    }
  }, [userId]);  // Re-fetch data when userId changes

  // Handle input changes in the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile data when exiting edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);

    if (isEditing && userId) {
      console.log('Saving profile data...', formData);

      const token = Cookies.get('token');  // Get token from cookies for consistency

      axios.put(`http://localhost:8080/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`  // Include token in the headers
        }
      })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
    }
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
        <form className="space-y-4">
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
                disabled={true}  
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
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
