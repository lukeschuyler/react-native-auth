import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { url } from '../env';

const client = axios.create({
  baseURL: url,
  timeout: 5000,
  responseType: 'json',
  validateStatus: function (status) {
    return status >= 200 && status < 500; // only catch server errors
  },
});

// Add a request interceptor that ensures we get 
client.interceptors.request.use(
  async config => {
    try {
      let token = await AsyncStorage.getItem('token');
      config.params = token ? { ...config.params, token } : { ...config.params };
      return config;
    } catch(e) {
      return config;
    }
  }, 
  error => {
    console.log(error);
});

export default client;
