import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const user = await login(username, password); 

      if (user.roles.includes('ROLE_ADMIN')) {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      } else if (user.roles.includes('ROLE_PLAYER')) {
        console.log('Navigating to /home');
        navigate('/home');
      } else {
        navigate('/login');
        setError('User role not recognized');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid login. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen" style={{ backgroundImage: `url('/Background/White Background.png')` }}>
      <div className="flex flex-col justify-center w-1/2 p-8 bg-white bg-opacity-60">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <img src="/Headers/Tetra League Logo.png" alt="Tetra League" className="mx-auto mb-8" style={{ width: '350px' }} />
            <h1 className="text-4xl font-bold text-gray-900">Welcome!</h1>
            <p className="text-gray-600">Stack your way to the top with Tetra League</p>
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
            <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg">Login</button>
          </form>
          <p className="mt-4 text-center">
            Don’t have an Account? <Link to="/register" className="text-blue-600 hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 relative">
        <img src="/Background/Blue Red Background.png" alt="Background Right" className="w-full h-full object-cover" />
      </div>
    </main>
  );
};

export default LoginPage;
