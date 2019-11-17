import {API} from "../../const";
import sendRequest from "../globalService";

class LoginService {
    async fetchLogin(login) {

        return sendRequest(API.LOGIN, 'POST',JSON.stringify(login))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }
            })
            .then(data => {
                return data;
            });
    }
}

export default new LoginService();
