const axios = require('axios');
const axiosApiInstance = axios.create();
import store from '@/store';

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('accessToken');
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.response.data.message === 'Токен не действителен!' && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = await store.dispatch('auth/refreshToken', { refreshToken });     
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;