import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Sidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

const CreateTournamentsPage = () => {
  const [tournamentDetails, setTournamentDetails] = useState({
    name: '',
    description: '',
    maxParticipants: 0,
    rank: 'UNRANKED',
    startDate: '',
    endDate: '',
    prizePool: 0.0,
    imageUrl: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [minStartDate, setMinStartDate] = useState('');
  const [minEndDate, setMinEndDate] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinStartDate(tomorrow.toISOString().slice(0, 16)); 
  }, []);

  useEffect(() => {
    if (tournamentDetails.startDate) {
      const selectedStartDate = new Date(tournamentDetails.startDate);
      const nextDay = new Date(selectedStartDate);
      nextDay.setDate(selectedStartDate.getDate() + 1);
      setMinEndDate(nextDay.toISOString().slice(0, 16));
    } else {
      setMinEndDate('');
    }
  }, [tournamentDetails.startDate]);

  const handleChange = (e) => {
    setTournamentDetails({
      ...tournamentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTournamentDetails((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!tournamentDetails.name || !tournamentDetails.description || !tournamentDetails.startDate || !tournamentDetails.endDate || !tournamentDetails.maxParticipants || !tournamentDetails.rank || !tournamentDetails.imageUrl) {
      setErrorMessage('Please fill out all fields and upload an image.');
      setIsLoading(false);
      return;
    }

    const selectedStartDate = new Date(tournamentDetails.startDate);
    const selectedEndDate = new Date(tournamentDetails.endDate);

    if (selectedEndDate <= selectedStartDate) {
      setErrorMessage('End date must be after the start date.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/tournaments', tournamentDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });

      if (response.status === 201) {
        setTournamentDetails({
          name: '',
          description: '',
          maxParticipants: 0,
          rank: 'UNRANKED',
          startDate: '',
          endDate: '',
          prizePool: 0.0,
          imageUrl: '',
        });
        setSuccessMessage('Tournament created successfully!');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
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
            <img src="/Headers/Tournament Creator 1.png" alt="Profile" className="w-72 md:w-6/12 -ml-80" style={{ width: '400px' }} />
          </div>
        </div>

        <div className="tournament-creator">
          <div className="w-full max-w-7xl bg-white opacity-90 rounded-lg shadow-lg p-8 h-[750px] overflow-y-auto mx-auto mt-12">
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            {isLoading && (
              <div className="text-blue-500 mb-4">Creating tournament...</div>
            )}
            <form onSubmit={handleSubmit}>
              <label className="text-2xl font-semibold mb-4 block">Tournament Details</label>

              <div className="form-group mb-6">
                <h2 className="text-xl font-medium">Name of Tournament</h2>
                <input
                  type="text"
                  name="name"
                  value={tournamentDetails.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="form-group mb-6">
                <h2 className="text-xl font-medium">Description</h2>
                <textarea
                  name="description"
                  value={tournamentDetails.description}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-lg h-36"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <h2 className="text-xl font-medium">Start Date</h2>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={tournamentDetails.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                    min={minStartDate} 
                  />
                </div>
                <div className="form-group">
                  <h2 className="text-xl font-medium">End Date</h2>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={tournamentDetails.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                    min={minEndDate} // Minimum end date set to the day after the selected start date
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <h2 className="text-xl font-medium">Max Participants</h2>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={tournamentDetails.maxParticipants}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    min="2" 
                    required
                  />
                </div>
                <div className="form-group">
                  <h2 className="text-xl font-medium">Rank</h2>
                  <select
                    name="rank"
                    value={tournamentDetails.rank}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="UNRANKED">Unranked</option>
                    <option value="BRONZE">Bronze</option>
                    <option value="SILVER">Silver</option>
                    <option value="GOLD">Gold</option>
                    <option value="PLATINUM">Platinum</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-6">
                <h2 className="text-xl font-medium">Prize Pool</h2>
                <input
                  type="number"
                  name="prizePool"
                  value={tournamentDetails.prizePool}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="form-group mb-6">
                <h2 className="text-xl font-medium">Tournament Image</h2>
                <input
                  type="file"
                  name="tournamentImage"
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                  onChange={handleImageChange}
                />
                {tournamentDetails.imageUrl && ( 
                  <div>
                    <img src={tournamentDetails.imageUrl} alt="Tournament Preview" className="mt-4 w-1/2 h-auto" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button if loading
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Tournament'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTournamentsPage;
