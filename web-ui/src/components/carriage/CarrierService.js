import {API} from "../../const";
import sendRequest from "../globalService";

class CarrierService {
    async getCompanyCarriers() {
        return sendRequest(API.CARRIERS)
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }
            })
            .then(data =>{
                return data;
            });
    }
}

export default new CarrierService();
