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
    rank: 'UNRANKED',
    startDate: '',
    endDate: '',
    registrationStartDate:'',
    registrationEndDate:'',
    prizePool: 0.0,
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = Cookies.get('token'); 
  const [isSaving, setIsSaving] = useState(false); // New state for saving

  useEffect(() => {
    const fetchTournament = async () => {
      if (token) {
        try {
          console.log("Fetching tournament...FETCHTOURNAMENT");
          const response = await axios.get(`http://localhost:8080/api/tournaments/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          console.log("Successfully fetched Tournament");
          setTournament(response.data); 
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching tournaments:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      } else {
        console.error('Token not found in cookies');
        setLoading(false); // Set loading to false if token is missing
      }
    };
    fetchTournament();
  }, []);

  const saveEdits = async () => {
    if (token && !isSaving) {
      setIsSaving(true); // Set saving to true
      console.log("Form Data before saving:", formData); // Debugging log
      try {
        console.log("Attempting to edit tournament details for tournament ID:", id);
        const response = await axios.put(`http://localhost:8080/api/tournaments/${id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("Successfully edited tournament details for tournament ID:", id);
        setIsEditing(false);
        setTournament(response.data); // Update tournament state with the new data
        setFormData(response.data); 
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setError('Failed to update tournament.');
      } finally {
        setLoading(false); // Set loading to false after fetching data
        setIsSaving(false);
      }
    } else {
      console.error('Token not found in cookies');
    }
  }

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
      await saveEdits();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
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
                <h2>Registration Start Date</h2>
                <input
                  type="datetime-local"
                  name="registrationStartDate"
                  value={formData.registrationStartDate || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <h2>Registration End Date</h2>
                <input
                  type="datetime-local"
                  name="registrationEndDate"
                  value={formData.registrationEndDate || ''}
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
                  disabled={!isEditing}
                />
              </div>

              <label>Player Registration Settings</label>

              <div className="form-group">
                  <h2>Minimum Rank</h2>
                  <select
                    name="rank"
                    value={formData.rank || 'UNRANKED'}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2 border-customGray border-opacity-30 text-customGray"
                    disabled={!isEditing}
                  >
                    <option value="UNRANKED">Unranked</option>
                    <option value="BRONZE">Bronze</option>
                    <option value="SILVER">Silver</option>
                    <option value="GOLD">Gold</option>
                    <option value="PLATINUM">Platinum</option>
                  </select>
              </div>

              <div className="form-group">
                <h2>Maximum Number of Participants</h2>
                <input
                  type="number"  
                  name="maxParticipants"
                  min="2" 
                  value={formData.maxParticipants || 0}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <label>Page Visuals</label>
              <div className="form-group">
                <h2>Tournament Image</h2>
                <input
                  type="file"
                  name="tournamentImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
                {formData.imageUrl && ( 
                  <div>
                    <img src={formData.imageUrl} alt="Tournament Preview" className="mt-4 w-1/2 h-auto" />
                  </div>
                )}
              </div>

              <button
                type="button"
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg opacity-100"
                onClick={toggleEdit}
                disabled={isSaving} // Disable button if saving
              >
                {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Tournament'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTournament;