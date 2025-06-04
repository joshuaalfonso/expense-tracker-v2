// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // replace with your backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');

  if (user) {
    const parsedUser = JSON.parse(user); // Parse the stored string to an object
    config.headers.Authorization = `Bearer ${parsedUser.jwt}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
