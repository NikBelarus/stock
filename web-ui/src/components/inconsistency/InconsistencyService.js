import sendRequest from "../globalService";
import {API} from "../../const";
import {store} from "../../store";

class InconsistencyService {

    async fetchCreateInconsistency(inconsistency){
        return sendRequest(API.INCONSISTENCY, 'POST', JSON.stringify(inconsistency))
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

    async getInconsistencyPage() {
        const state = store.getState();
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber;
        return sendRequest(API.INCONSISTENCY + attr)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }

}

 export default new InconsistencyService();
