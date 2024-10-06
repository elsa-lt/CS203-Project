import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateofbirth, setDOB] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
          username,
          name,
          email,
          password,
          confirmPassword,
          dateofbirth,
          location
      });
  
      // Log the response
      console.log('Response:', response);
  
      if (response.status === 200) {
          navigate('/login');
      } else {
          // Log response if error
          console.log('Response data:', response.data);
          setError(response.data.message || 'Sign up failed RESPONSE. Please try again.');
      }
  } catch (error) {
      // Log the error response if available
      if (error.response) {
          console.error('Error response:', error.response.data);
      } else {
          console.error('Sign up failed:', error.message);
      }
      setError('Sign up failed. Please try again.');
  }
  
};


  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url('/Background/White Background.png')` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <img
            src="/Headers/Tetra League Logo.png"
            alt="Tetra League"
            className="mx-auto mb-8"
            style={{ width: '250px' }}
          />
          <h1 className="text-4xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-gray-600">Join the Tetra League</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateofbirth" className="block text-gray-700">Date of Birth</label>
            <input
              id="dateofbirth"
              type="dateofbirth"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Date of Birth"
              value={dateofbirth}
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input
              id="location"
              type="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login Here</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
