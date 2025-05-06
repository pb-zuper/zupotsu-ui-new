import axios, { AxiosResponse } from 'axios';
import { getLocalStorage, setLocalStorage } from './LocalStorageService';

const instance = axios.create();

instance.interceptors.request.use(
  (request: any) => {
    const authToken = getLocalStorage('userInfoAdmin').accessToken
      ? getLocalStorage('userInfoAdmin').accessToken
      : '';
    const projectId = getLocalStorage('userInfoAdmin').projectId
      ? getLocalStorage('userInfoAdmin').projectId
      : '';
    request.headers.common['authorization'] = `Bearer ${authToken}`;
    request.headers.common['x-tenant-id'] =
      projectId || '65b8c51895a9937aac22698b';
      // 65b8c51895a9937aac22698b
      //64e83c502f305b0f92350555
    return request;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    const status = error.response?.status || 500;
    switch (status) {
      case 401:
        setLocalStorage('logout', true);
        break;
      case 404:
        break;
      case 500:
        break;
      case 403:
        return error.response;
      default:
        break;
    }
    return error.response;
  }
);
export default instance;
