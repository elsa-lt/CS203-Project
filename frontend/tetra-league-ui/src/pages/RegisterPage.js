import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
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
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
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

export default SignUpPage;
