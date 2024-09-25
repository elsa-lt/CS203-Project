import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
          try {
              const decoded = JSON.parse(atob(token.split('.')[1])); 
              console.log('Decoded token:', decoded);
              setUser({ ...decoded, role: decoded.roles[0] });
          } catch (error) {
              console.error('Failed to decode token:', error);
          }
      }
  }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', { username, password });
            const { accessToken } = response.data;

            Cookies.set('token', accessToken, { expires: 7 });
            console.log('Token saved:', Cookies.get('token'));

            const userData = { ...response.data, role: response.data.roles[0] }; 
            setUser(userData);
            console.log('Setting user:', userData); 
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token'); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
