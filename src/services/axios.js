import axios from 'axios';
import { url } from '../env';


export default axios.create({
  baseURL: url,
  timeout: 1000,
  responseType: 'json'
});
