import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('user-token');

    if (token)
      config.headers['Authorization'] = `Bearer ${token}`;
    
    return config;
  },
  error => Promise.reject(error)
)

export default http;