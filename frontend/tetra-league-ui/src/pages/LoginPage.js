import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Ensure axios is imported

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP was sent
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      setLoading(true); // Disable the login button by setting loading to true
      const user = await login(username, password); 

      // After successful login, retrieve email by username
      const emailResponse = await axios.get(`http://localhost:8080/api/auth/get-email?username=${username}`);
      const email = emailResponse.data.email; // Get the email from the response

      // Send OTP to the retrieved email
      await axios.post('http://localhost:8080/api/auth/send-otp', { email });
      setOtpSent(true); // Update state to reflect OTP sent
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid login. Please try again.');
    } finally {
      setLoading(false); // Enable the login button after the process is done
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Disable the Verify OTP button while processing
      // Retrieve email again to verify OTP
      const emailResponse = await axios.get(`http://localhost:8080/api/auth/get-email?username=${username}`);
      const email = emailResponse.data.email;

      const response = await axios.post('http://localhost:8080/api/auth/verify-otp', { email, otp });
      // Handle successful OTP verification
      console.log(response.data);
      
      // Redirect based on user role
      const user = await login(username, password); // Log in again to get user details after OTP
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
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false); // Enable the Verify OTP button after the process is done
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
          {/* Login Form */}
          {!otpSent ? (
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
              <button 
                type="submit" 
                className={`w-full bg-black text-white font-semibold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable the button if loading
              >
                {loading ? 'Processing...' : 'Login'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOtp} className="mt-4">
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className={`w-full bg-black text-white font-semibold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable the button if loading
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}
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
