//import api from "./api";

class AuthService {
    // login(data) {
    //     api.post('/login', data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response) => {
    //         if (response.data.access_token) {
                
    //         }
    //         return;
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });
    // }

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