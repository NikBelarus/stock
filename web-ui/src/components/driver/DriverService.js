import sendRequest from "../globalService";
import {API} from "../../const";

class DriverService {
    async createDriver(driver) {
        return sendRequest(API.DRIVERS, 'POST', JSON.stringify(driver))
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                if(!data.success){
                    throw new Error(data.message);
                }
                return data.object;
            });
    }
}

export default new DriverService();
