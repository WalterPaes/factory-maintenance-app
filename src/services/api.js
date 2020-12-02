import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getToken()
    }
});

export default api;