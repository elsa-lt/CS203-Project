import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie handling

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Replace 'token' with the actual key for your JWT cookie

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // Include the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
