import api from "./api";
import AuthService from "./AuthService";
import moment from "moment";

class MaintenanceService {
    async create(data) {
        let result;
        try {
            data.start = moment(data.start.getTime()).format('YYYY-MM-DD hh:mm:ss')
            data.end = moment(data.end.getTime()).format('YYYY-MM-DD hh:mm:ss')

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
        console.log("data", data);
        let result;
        try {
            data.start = moment(data.start.getTime()).format('YYYY-MM-DD hh:mm:ss')
            data.end = moment(data.end.getTime()).format('YYYY-MM-DD hh:mm:ss')

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

    async all(pageNum) {
        let result;
        let path = '/maintenances'

        if (pageNum) {
            path = '/maintenances?page='+pageNum
        }
        
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