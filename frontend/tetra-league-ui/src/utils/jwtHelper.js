export const getToken = () => localStorage.getItem('jwt');

export const isAuthenticated = () => !!getToken();
