import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      setUser({ token, role });

      if (role === 'player') {
        navigate('/home');
      } else if (role === 'admin') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  console.log('AuthProvider user:', user); // Debugging line

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
