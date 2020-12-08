import axios from 'axios';

const api = axios.create({
    baseURL: 'http://wpaes-dev.com.br/factory-test/public/api/', //'http://localhost:8001/api/',
});

export default api;