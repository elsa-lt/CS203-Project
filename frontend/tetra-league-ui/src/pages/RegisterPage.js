import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate that required fields are not empty
      if (!username || !name || !email || !confirmPassword) {
          setError('All fields are required');
          return;
      }

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
              confirmPassword // Include confirmPassword
          });

          // Log the response
          console.log('Response:', response);

          if (response.status === 200) {
              navigate('/login');
          } else {
              // Log response if error
              console.log('Response data:', response.data);
              setError(response.data.message || 'Sign up failed. Please try again.');
          }
      } catch (error) {
          // Handle the error response from the backend
          if (error.response) {
              console.error('Error response:', error.response.data);
              setError(error.response.data.message || 'Sign up failed. Please try again.');
          } else {
              console.error('Sign up failed:', error.message);
              setError('Sign up failed. Please try again.');
          }
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
              required
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
              required
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
              required
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
              required
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
              required
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
