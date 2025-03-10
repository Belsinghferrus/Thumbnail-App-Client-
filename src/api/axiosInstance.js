import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE === "Production" 
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_DEV_URL,
  withCredentials: true, 
});
 


export default axiosInstance;
