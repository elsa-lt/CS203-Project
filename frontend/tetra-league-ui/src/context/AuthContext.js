import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
          const fetchUserInfo = async () => {
              try {
                  const response = await axios.get('http://localhost:8080/api/user/info', {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });
                  const userData = response.data; 
                  console.log('User data from backend:', userData);
                  setUser(userData); // Set user with role from backend
              } catch (error) {
                  console.error('Failed to fetch user info:', error);
              }
          };
          fetchUserInfo();
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
