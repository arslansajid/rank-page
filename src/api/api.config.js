import Config from './config';
import axios from 'axios';
import Cookie from "js-cookie";
const token = Cookie.get('rankpage_access_token')

const axiosInstance = axios.create({
  baseURL: Config.API_END_POINT,
  timeout: 30000, // 30 secs.
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : !!token ? token : '',
  },
});

export default axiosInstance;
