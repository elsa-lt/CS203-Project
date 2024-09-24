import React from 'react';
import Navbar from '../../components/AdminSidebar';
import { useState } from 'react';

const CreateTournamentsPage = () => {
  const [tournamentDetails, setTournamentDetails] = useState({
    name: '',
    description: '',
    dateTime: '',
    venue: '',
    matchFormat: '',
    timeLimit: '',
    conduct: '',
    prizePool: '',
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
  });

  const handleChange = (e) => {
    setTournamentDetails({
      ...tournamentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tournament Details:', tournamentDetails);
  };

  return (
    <div className="flex">
      <Navbar className="fixed top-0 left-0 h-full w-80 z-10" />
      <main
        className="flex-1 min-h-screen bg-cover bg-center p-6 ml-80"
        style={{ backgroundImage: `url('/Background/White Background.png')` }}
      >
        <div className="w-1/2 p-8 relative">
          <div className="relative top-0 left-80 text-center">
            <img src="/Headers/Tournament Creator 1.png" alt="Profile" className="w-72 md:w-6/12 -ml-80" style={{ width: '550px' }} />
          </div>
        </div>

        <div className="tournament-creator">
          <div className="w-full max-w-6xl bg-white opacity-70 rounded-lg shadow-lg p-6 h-[600px] overflow-y-auto ml-0">
            <form onSubmit={handleSubmit}>
              <label>Tournament Details</label>
              <div className="form-group">
                <h2>Name of Tournament</h2>
                <input
                  type="text"
                  name="name"
                  value={tournamentDetails.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Description</h2>
                <textarea
                  name="description"
                  value={tournamentDetails.description}
                  onChange={handleChange}
                  style={{ width: '500px', height: '150px', border: '0.5px solid #000' }}
                />
              </div>

              <div className="form-group">
                <h2>Date & Time</h2>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={tournamentDetails.dateTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Venue</h2>
                <input
                  type="text"
                  name="venue"
                  value={tournamentDetails.venue}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Match Format</h2>
                <input
                  type="text"
                  name="matchFormat"
                  value={tournamentDetails.matchFormat}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Time Limit</h2>
                <input
                  type="text"
                  name="timeLimit"
                  value={tournamentDetails.timeLimit}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Conduct</h2>
                <input
                  type="text"
                  name="conduct"
                  value={tournamentDetails.conduct}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2> Prize Pool</h2>
                <input
                  type="number"
                  name="prizePool"
                  value={tournamentDetails.prizePool}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>1st Place Prize</h2>
                <input
                  type="text"
                  name="firstPlace"
                  value={tournamentDetails.firstPlace}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>2nd Place Prize</h2>
                <input
                  type="text"
                  name="secondPlace"
                  value={tournamentDetails.secondPlace}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>3rd Place Prize</h2>
                <input
                  type="text"
                  name="thirdPlace"
                  value={tournamentDetails.thirdPlace}
                  onChange={handleChange}
                />
              </div>

              <label>Player Registration Settings</label>
              <div className="form-group">
                <h2>Maximum Number of Participants</h2>
                <input
                  type="number"
                  name="maxParticipants"
                  value={tournamentDetails.maxParticipants}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Minimum Rank Eligibility</h2>
                <input
                  type="text"
                  name="minRank"
                  value={tournamentDetails.minRank}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Registration Start Date & Time</h2>
                <input
                  type="datetime-local"
                  name="registrationStart"
                  value={tournamentDetails.registrationStart}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <h2>Registration End Date & Time</h2>
                <input
                  type="datetime-local"
                  name="registrationEnd"
                  value={tournamentDetails.registrationEnd}
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
              <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg opacity-100">Publish</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTournamentsPage;
