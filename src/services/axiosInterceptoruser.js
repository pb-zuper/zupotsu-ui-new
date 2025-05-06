import axios from 'axios';
import mixpanelEvents from '../mixpanel/mixpanelEvents';



const axiosUserInstance = axios.create({
     baseUrl : process.env.REACT_APP_ZUPOTSU_API_BASE_USER_URL
});

axiosUserInstance.interceptors.request.use(
    (config) => {
        config.headers['user_id'] = localStorage.getItem("userID")
        config.headers['token'] = localStorage.getItem("accessToken")
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosUserInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status } = error.response;
        // if(!localStorage.getItem("userID") || !localStorage.getItem("accessToken"))
        // {
        //     window.location.href = "/loginregister"; 
        //     return;
        // }
        // else 
        if (status === 401) {
            const sessionData = {
                IsSignedIn: false,
              };
              
            mixpanelEvents.onSessionEnded(sessionData);
            alert("Session Timeout!!")
            localStorage.clear()
            window.location.href = "/loginregister"; 
            return;
        }
        return Promise.reject(error);
    }
);

export default axiosUserInstance;