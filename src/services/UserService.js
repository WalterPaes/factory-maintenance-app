import api from "./api";
import AuthService from "./AuthService";

class UserService {
    async create(data) {
        let result;
        try {
            let response = await api.post('/users', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            });
            result = {
                status: response.status,
                data: response.data
            };
        } catch(e) {
            result = {
                status: e.response.status,
                data: e.response.data
            };
        }
        return result;
    }

    async edit(id, data) {
        let result;
        try {
            let response = await api.put('/users/' + id, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            });
            result = {
                status: response.status,
                data: response.data
            };
        } catch(e) {
            result = {
                status: e.response.status,
                data: e.response.data
            };
        }
        return result;
    }

    async show(id) {
        let result;
        try {
            let response = await api.get('/users/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            });
            result = {
                status: response.status,
                data: response.data
            };
        } catch(e) {
            result = {
                status: e.response.status,
                data: e.response.data
            };
        }
        return result;
    }

    async all() {
        let result;
        try {
            let response = await api.get('/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            });
            result = {
                status: response.status,
                data: response.data
            };
        } catch(e) {
            result = {
                status: e.response.status,
                data: e.response.data
            };
        }
        return result;
    }

    async delete(id) {
        let result;
        try {
            let response = await api.delete('/users/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            });
            result = {
                status: response.status,
                data: response.data
            };
        } catch(e) {
            result = {
                status: e.response.status,
                data: e.response.data
            };
        }
        return result;
    }
}

export default new UserService();