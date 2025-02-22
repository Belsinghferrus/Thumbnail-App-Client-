import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://server.production.tumbnail.com/api',
  withCredentials: true, 
});

export default axiosInstance;

// "http://localhost:5000/api"
// 'https://server.production.tumbnail.com/api'