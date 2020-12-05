import api from "./api";
import AuthService from "./AuthService";

class MaintenanceService {
    async create(data) {
        let result;
        try {
            let response = await api.post('/maintenances', data, {
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
            let response = await api.put('/maintenances/' + id, data, {
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
            let response = await api.get('/maintenances/' + id, {
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
            let response = await api.get('/maintenances', {
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
            let response = await api.delete('/maintenances/' + id, {
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

export default new MaintenanceService();