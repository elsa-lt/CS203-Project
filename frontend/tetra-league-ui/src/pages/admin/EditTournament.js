import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Sidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams } from 'react-router-dom';

const EditTournament = () => {
  const { id } = useParams(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxParticipants: 0,
    minElo: 0,
    maxElo: 0,
    startDate: '',
    endDate: '',
    conduct: '',
    prizePool: 0.0,
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
    registrationStart: '',
    registrationEnd: '',
  });
  const [error, setError] = useState('');
  const [tournament, setTournament] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    const fetchUserIdAndTournamentDetails = async () => {
      try {
        
        const userInfoResponse = await axios.get('http://localhost:8080/api/users/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { username: fetchedUsername } = userInfoResponse.data; 
        setUsername(fetchedUsername); 

        
        const tournamentResponse = await axios.get(`http://localhost:8080/api/tournaments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched tournament:', tournamentResponse.data); 
        setTournament(tournamentResponse.data);
        setFormData(tournamentResponse.data);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
        setError('Failed to fetch tournament details.');
      }
    };

    if (token) {
      fetchUserIdAndTournamentDetails();
    } else {
      console.error("Token is missing");
    }
  }, [id]); // id is dynamically fetched from the URL

  if (error) {
    return <div className="text-red-600">{error}</div>; // Display error message if any
  }

  if (!tournament) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const token = Cookies.get('token');
        await axios.put(`http://localhost:8080/api/tournaments/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Tournament updated successfully:', formData);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating tournament:', error);
        setError('Failed to update tournament.');
      }
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <AdminNavbar className="fixed top-0 left-0 h-full w-80 z-10" />
      <main
        className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80"
        style={{ backgroundImage: `url('/Background/White Background.png')` }}
      >
        <div className="w-1/2 p-8 relative">
          <div className="relative top-10 left-60 text-center">
            <img
              src="/Headers/Edit Tournaments Header.png"
              alt="Profile"
              className="w-72 md:w-6/12 -ml-80"
              style={{ width: '550px' }}
            />
          </div>
        </div>

        <div className="tournament-creator">
          <div className="w-full max-w-6xl bg-white opacity-70 rounded-lg shadow-lg p-6 h-[600px] overflow-y-auto -ml-10 mt-10">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form>
              <label>Tournament Details</label>

              <div className="form-group">
                <h2>Name of Tournament</h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <h2>Description</h2>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: '500px', height: '150px', border: '0.5px solid #000' }}
                />
              </div>

              <div className="form-group">
                <h2>Min Elo</h2>
                <input
                  type="number"
                  name="minElo"
                  value={formData.minElo || 0}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Max Elo</h2>
                <input
                  type="number"
                  name="maxElo"
                  value={formData.maxElo || 0}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Start Date</h2>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <h2>End Date</h2>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <h2>Prize Pool</h2>
                <input
                  type="number"
                  name="prizePool"
                  value={formData.prizePool || 0.0}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>1st Place Prize</h2>
                <input
                  type="text"
                  name="firstPlace"
                  value={formData.firstPlace || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>2nd Place Prize</h2>
                <input
                  type="text"
                  name="secondPlace"
                  value={formData.secondPlace || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>3rd Place Prize</h2>
                <input
                  type="text"
                  name="thirdPlace"
                  value={formData.thirdPlace || ''}
                  onChange={handleChange}
                />
              </div>

              <label>Player Registration Settings</label>
              <div className="form-group">
                <h2>Maximum Number of Participants</h2>
                <input
                  type="number"  
                  name="maxParticipants"
                  value={formData.maxParticipants || 0}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Registration Start Date & Time</h2>
                <input
                  type="datetime-local"
                  name="registrationStart"
                  value={formData.registrationStart || ''}
                  onChange={handleChange}
                />
              </div>

              <div
                className="form-group">
                <h2>Registration End Date & Time</h2>
                <input
                  type="datetime-local"
                  name="registrationEnd"
                  value={formData.registrationEnd || ''}
                  onChange={handleChange}
                />
              </div>

              <label>Page Visuals</label>
              <div className="form-group">
                <h2>Banner Image</h2>
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <h2>Card Image</h2>
                <input
                  type="file"
                  name="cardImage"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </div>

              <button
                type="button"
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg opacity-100"
                onClick={toggleEdit}
              >
                {isEditing ? 'Save Changes' : 'Edit Tournament'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTournament;
