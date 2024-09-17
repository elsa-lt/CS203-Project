const API_URL = '/api/auth';  // Backend API base URL

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('jwt', data.jwt);  // Save JWT token in localStorage
    return data;
};

export const register = async (email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('jwt', data.jwt);  // Save JWT token in localStorage
    return data;
};

export const logout = () => {
    localStorage.removeItem('jwt');  // Remove JWT token from localStorage
};

export const getToken = () => localStorage.getItem('jwt');
