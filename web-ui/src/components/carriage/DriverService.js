import {API} from "../../const";
import sendRequest from "../globalService";

class DriverService {
    async getCarrierDrivers(carrierId){
        return sendRequest(API.DRIVERS +"?carrier_id="+ +carrierId)
            .then(function(response){
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

export default new DriverService();
