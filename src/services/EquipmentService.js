import api from "./api";
import AuthService from "./AuthService";

class EquipmentService {
    async create(data) {
        let result;
        try {
            let response = await api.post('/equipments', data, {
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
            let response = await api.put('/equipments/' + id, data, {
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
            let response = await api.get('/equipments/' + id, {
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
        let path = '/equipments'

        if (pageNum) {
            path = '/equipments?page='+pageNum
        }

        try {
            let response = await api.get(path, {
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

    async actives() {
        let result;
        try {
            let response = await api.get('/equipments?actives=1', {
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
            let response = await api.delete('/equipments/' + id, {
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

    async maintenances(equipment_id) {
        let result;
        try {
            let response = await api.get('/equipments/' + equipment_id + '/maintenances', {
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

    async components(equipment_id) {
        let result;
        try {
            let response = await api.get('/equipments/' + equipment_id + '/components', {
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

    async storeComponents(equipment_id, data) {
        let result;
        try {
            let response = await api.post('/equipments/' + equipment_id + '/components', data, {
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

    async removeComponents(equipment_id, component_id) {
        let result;
        try {
            let response = await api.delete('/equipments/' + equipment_id + '/components/' + component_id, {
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

export default new EquipmentService();