import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_BACKEND_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
});
// process.env.REACT_APP_BACKEND_SERVER REACT_APP_LOCAL_BACKEND_SERVER
export default axiosInstance;
