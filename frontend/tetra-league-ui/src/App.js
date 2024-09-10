import "./App.css"
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHomePage from "./pages/player/UserHomePage";
import CurrentMatchPage from "./pages/player/CurrentMatchPage";
import LeaderboardPage from "./pages/player/LeaderboardPage";
import MatchHistoryPage from "./pages/player/MatchHistoryPage";
import ProfilePage from "./pages/player/ProfilePage";
import TournamentsPage from "./pages/player/TournamentsPage";


function App() {
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
    </Routes>
  );
}

export default App;
