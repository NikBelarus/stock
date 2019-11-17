import {store} from "../../store";
import sendRequest from "../globalService";
import {API} from "../../const";

class CarrierService {
    async getCarrierPage() {
        const state = store.getState();
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber;
        return sendRequest(API.CARRIERS + attr)
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
    async createCarrier(carrier) {
        return sendRequest(API.CARRIERS, 'POST', JSON.stringify(carrier))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }
            })
            .then(data => {
                if(!data.success){
                    throw new Error(data.message);
                }
                return data.object;
            });
    }
    async deleteCarrier(id){
        return sendRequest(API.CARRIERS + '/' + id,
            'DELETE')
    }
}

export default new CarrierService();
