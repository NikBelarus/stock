import sendRequest from "../globalService";
import {API} from "../../const";
import {store} from "../../store";

class CancellationService {
    async fetchCreateCancellationAct(cancellation){
        return sendRequest(API.CANCELLATION, 'POST', JSON.stringify(cancellation))
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

    async getCancellationPage() {
        const state = store.getState();
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber;
        return sendRequest(API.CANCELLATION + attr)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}
export default new CancellationService();
