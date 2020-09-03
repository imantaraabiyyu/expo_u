import store from '../configs/store';
import AsyncStorage from '@react-native-community/async-storage';
const axios = require('axios');

const instanceAxios = axios.create({
  baseURL: 'http://192.168.1.99:3010/'
});

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

function getToken() {
  const state = store.getState().auth.data;
  return state;
}

instanceAxios.interceptors.request.use(
  config => {
    const { token } = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code !== 1) {
      const error = new Error(data.message || 'Unknown Error.');
      error.data = data.data;
      throw error;
    }
    return sleep(500, data.data);
  },
  function(error) {
    const originalRequest = error.config;
    const token = getToken();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.post(`/auth/${token}`).then(res => {
        if (res.status === 200) {
          const {
            email,
            token,
            role,
            profileId,
            photo,
            username,
            id
          } = res.data;
          AsyncStorage.setItem('email', email);
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('role', role);
          AsyncStorage.setItem('profileId', profileId);
          AsyncStorage.setItem('photo', photo);
          AsyncStorage.setItem('username', username);
          AsyncStorage.setItem('id', id);

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          return axios(originalRequest);
        }
      });
    }
  }
);

export { instanceAxios };
