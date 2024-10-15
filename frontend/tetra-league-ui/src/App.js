import "./App.css";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHomePage from './pages/player/UserHomePage';
import CurrentMatchPage from './pages/player/CurrentMatchPage';
import LeaderboardPage from './pages/player/LeaderboardPage';
import MatchHistoryPage from './pages/player/MatchHistoryPage';
import ProfilePage from './pages/player/ProfilePage';
import TournamentsPage from './pages/player/TournamentsPage';
import TournamentDetailsPage from './pages/player/TournamentDetails';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTournamentsPage from './pages/admin/AdminTournamentsPage';
import ManageTournamentPage from './pages/admin/ManageTournamentPage';
import CreateTournamentPage from './pages/admin/CreateTournamentPage';
import EditTournament from './pages/admin/EditTournament';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLeaderBoardPage from "./pages/admin/AdminLeaderBoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<ProtectedRoute element={<UserHomePage />} role="player" />} />
      <Route path="/current-match" element={<ProtectedRoute element={<CurrentMatchPage />} role="player" />} />
      <Route path="/leaderboard" element={<ProtectedRoute element={<LeaderboardPage />} role="player" />} />
      <Route path="/match-history" element={<ProtectedRoute element={<MatchHistoryPage />} role="player" />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} role="player" />} />
      <Route path="/tournaments" element={<ProtectedRoute element={<TournamentsPage />} role="player" />} />
      <Route path="/tournament-details/:id" element={<ProtectedRoute element={<TournamentDetailsPage />} role="player" />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboardPage />} role="admin" />} />
      <Route path="/admin-tournaments" element={<ProtectedRoute element={<AdminTournamentsPage />} role="admin" />} />
      <Route path="/create-tournament" element={<ProtectedRoute element={<CreateTournamentPage />} role="admin" />} />
      <Route path="/edit-tournament/:id" element={<ProtectedRoute element={<EditTournament />} role="admin" />} />
      <Route path="/manage-tournament/:id" element={<ProtectedRoute element={<ManageTournamentPage />} role="admin" />} />
      <Route path="/tournament-leaderboard" element={<ProtectedRoute element={<AdminLeaderBoardPage />} role="admin" />} />
    </Routes>
  );
}

export default App;