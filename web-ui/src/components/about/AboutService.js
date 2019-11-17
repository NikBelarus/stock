import {API} from "../../const";
import sendRequest from "../globalService";

class AboutService {
    async getAbout() {
        return sendRequest(API.ABOUT)
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

export default new AboutService();
