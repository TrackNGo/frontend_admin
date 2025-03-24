import axios from 'axios';

const API_BASE_URL =  'http://localhost:3000';

const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/api-contact/`,
  headers: {
    'Content-Type': 'application/json',
  }
});


adminApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default adminApi;