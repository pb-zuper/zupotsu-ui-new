import axios from 'axios';
import popupFun from '../Container/MainPage';
import mixpanelEvents from '../mixpanel/mixpanelEvents';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ZUPOTSU_API_BASE_URL, // Fixed typo
});

const handleSessionEnd = () => {
  const sessionData = {
    IsSignedIn: Boolean(localStorage.getItem('userID')),
  };
  mixpanelEvents.onSessionEnded(sessionData);
  alert('Session Timeout!!');
  localStorage.clear();
  window.location.href = '/loginregister';
};

axiosInstance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userID');
    const token = localStorage.getItem('accessToken');
    if (userId && token) {
      config.headers['user_id'] = userId;
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status; // Safeguard for undefined response
    if (status === 401) {
      handleSessionEnd();
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
