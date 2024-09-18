const jwtToken = localStorage.getItem('jwt');

export const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization header is unnecessary for login
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('jwt', data.token);  // Store JWT token after successful login
    }

    return data;
};

export const fetchProtectedData = async () => {
    const jwtToken = localStorage.getItem('jwt');
    const response = await fetch('/api/protected-endpoint', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.json();
};


export const register = async (userData) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
};
