import api from "./api";

class AuthService {
    async login(data) {
        let result;
        try {
            let response = await api.post('/login', data, {
                headers: {
                    'Content-Type': 'application/json',
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

    logged() {
        return (this.getUser() !== null);
    }

    saveUser(data) {
        sessionStorage.setItem("user", JSON.stringify(data));
    }

    logout() {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem("user"))
    }

    getToken() {
        if (this.getUser() !== null) {
            return this.getUser().access_token
        }
        return "";
    }
    
}
export default new AuthService();