import sendRequest from "../globalService";
import {API} from "../../const";

class GoodService {
    async fetchCarrierStockGoods(carrierId) {
        return sendRequest(API.GOODS +"?carrier_id="+carrierId)
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }
}

export default new GoodService();
