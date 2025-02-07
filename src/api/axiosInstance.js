import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true, 
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
});

export default axiosInstance;