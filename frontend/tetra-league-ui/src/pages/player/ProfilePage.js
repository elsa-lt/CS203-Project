import Navbar from '../../components/UserNavbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: ''
  });
  const [originalData, setOriginalData] = useState(formData); 
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    const fetchUserIdAndDetails = async () => {
      try {
        const userInfoResponse = await axios.get('http://localhost:8080/api/users/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id } = userInfoResponse.data;
        setUserId(id);

        const userDetailsResponse = await axios.get(`http://localhost:8080/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(userDetailsResponse.data);
        setOriginalData(userDetailsResponse.data); 
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details.');
      }
    };

    if (token) {
      fetchUserIdAndDetails();
    } else {
      console.error("Token is missing");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkIfUserExists = async (username, email) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`http://localhost:8080/api/users/check?username=${username}&email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.exists; 
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false; 
    }
  };

  const toggleEdit = async () => {
    if (isEditing) {
      const { username, email } = formData;
      const userExists = await checkIfUserExists(username, email);
      
      if (userExists) {
        setError('Username or email already exists');
        setFormData(originalData);
        return; 
      }

      if (userId) {
        const updatedData = { ...formData }; 

        try {
          const token = Cookies.get('token');
          await axios.put(`http://localhost:8080/api/users/${userId}`, updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setError('');

          window.location.reload();
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                window.location.href = '/login'; 
                break;
              case 409:
                setError('Username or email already exists');
                setFormData(originalData); 
                break;
              default:
                setError('An unexpected error occurred. Please try again later.');
                setFormData(originalData);
            }
          } else {
            setError('Network error: Please check your connection.');
            setFormData(originalData);
          }
        }
      }
    }

    setIsEditing(!isEditing);
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <Navbar />
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>
        <form className="space-y-5">
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Name:
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <span className="block mt-1 text-gray-900">{formData.name}</span>
              )}
            </label>
            <label className="text-sm font-medium text-gray-700">
              Username:
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.username}
                  onChange={handleChange}
                />
              ) : (
                <span className="block mt-1 text-gray-900">{formData.username}</span>
              )}
            </label>
            <label className="text-sm font-medium text-gray-700">
              Email:
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <span className="block mt-1 text-gray-900">{formData.email}</span>
              )}
            </label>
          </div>
        </form>

        <div className="mt-8">
          <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200" onClick={toggleEdit}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
