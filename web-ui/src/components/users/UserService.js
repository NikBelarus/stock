import {API} from "../../const";
import sendRequest from "../globalService";
import {store} from "../../store";

class UserService {
    async fetchCreate(user, fetch_method) {
        let URL = API.USERS;
        if(fetch_method === "PUT"){
            URL += "/" + user.id;
        }
        return sendRequest(URL, fetch_method, JSON.stringify(user))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                if(!data.success){
                    throw new Error(data.message);
                }
                return data.object;
            });
    }

    async getUsersPage() {
        const state = store.getState();
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber;
        return sendRequest(API.USERS + attr)
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

    async deleteUser(id) {
        return sendRequest(API.USERS + '/' + id,
            'DELETE')
    }

    async getStockUsersPage() {
        const state = store.getState();
        const stockId = state.company.company.activeStockId;
        if(stockId < 0){
            return this.getUsersPage();
        }
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber + "&stockId=" +stockId;
        return sendRequest(API.USERS + attr)
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

export default new UserService();
