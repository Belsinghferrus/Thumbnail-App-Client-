import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE === "Production" 
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_DEV_URL,
  withCredentials: true, 
});
 
console.log("baseURL:", axiosInstance);


export default axiosInstance;

// "http://localhost:5000/api"
// 'https://server.production.tumbnail.com/api'