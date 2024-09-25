import "./App.css";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHomePage from './pages/player/UserHomePage';
import CurrentMatchPage from './pages/player/CurrentMatchPage';
import LeaderboardPage from './pages/player/LeaderboardPage';
import MatchHistoryPage from './pages/player/MatchHistoryPage';
import ProfilePage from './pages/player/ProfilePage';
import TournamentsPage from './pages/player/TournamentsPage';
import TournamentDetails from './pages/player/TournamentDetails';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageTournamentsPage from './pages/admin/ManageTournamentsPage';
import AdminPastTournamentsPage from './pages/admin/AdminPastTournamentsPage';
import CreateTournamentPage from './pages/admin/CreateTournamentPage';

const ProtectedRoute = ({ element, role }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <LoginPage />;
  }

  return element;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<UserHomePage />} />
      <Route path="/current-match" element={<CurrentMatchPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/match-history" element={<MatchHistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/tournaments" element={<TournamentsPage />} />
      <Route path="/tournament-details" element={<TournamentDetails />} />
      <Route path="/dashboard" element={<AdminDashboardPage />} />
      <Route path="/manage-tournaments" element={<ManageTournamentsPage />} />
      <Route path="/admin-past-tournaments" element={<AdminPastTournamentsPage />} />
      <Route path="/create-tournament" element={<CreateTournamentPage />} />

    </Routes>
  );
}

export default App;

  {/* Player Routes
      <Route path="/home" element={user && user.role === 'player' ? <UserHomePage /> : <LoginPage />} />
      <Route path="/current-match" element={user && user.role === 'player' ? <CurrentMatchPage /> : <LoginPage />} />
      <Route path="/leaderboard" element={user && user.role === 'player' ? <LeaderboardPage /> : <LoginPage />} />
      <Route path="/match-history" element={user && user.role === 'player' ? <MatchHistoryPage /> : <LoginPage />} />
      <Route path="/profile" element={user && user.role === 'player' ? <ProfilePage /> : <LoginPage />} />
      <Route path="/tournaments" element={user && user.role === 'player' ? <TournamentsPage /> : <LoginPage />} />

      {/* Admin Routes */}
      {/* <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboardPage />} role="admin" />} />
      <Route path="/manage-tournaments" element={<ProtectedRoute element={<ManageTournamentsPage />} role="admin" />} />
      <Route path="/manage-schedules" element={<ProtectedRoute element={<ManageSchedulesPage />} role="admin" />} />
      <Route path="/manage-participants" element={<ProtectedRoute element={<ManageParticipantsPage />} role="admin" />} />
      <Route path="/manage-results" element={<ProtectedRoute element={<ManageResultsPage />} role="admin" />} /> */} 