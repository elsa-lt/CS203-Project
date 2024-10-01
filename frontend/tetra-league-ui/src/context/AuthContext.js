import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    const fetchUserInfo = async () => {
        const token = Cookies.get('token');
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const response = await axios.get('http://localhost:8080/api/users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = response.data;
            console.log('User data from backend:', userData);
            setUser(userData); 
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserInfo().catch(console.error);
    }, [])

    const login = async (username, password) => {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', { username, password });
        const { accessToken, roles } = response.data;
    
        Cookies.set('token', accessToken, { expires: 7 });
        await fetchUserInfo();
    
        return { roles };
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    };
    

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const hasRole = (role) => {
        if (!isAuthenticated()) {
            return false;
        }
        console.log("Roles:", user.roles);
        for (const userRole of user.roles) {
            if (userRole.name.toUpperCase() === role.toUpperCase() 
                || userRole.name.toUpperCase() === `ROLE_${role.toUpperCase()}`) {
                return true;
            }
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
