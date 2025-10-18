import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://thumbnail-server-app.onrender.com/api",
  withCredentials: true, 
});
 


export default axiosInstance;
