import {store} from "../../store";
import sendRequest from "../globalService";
import {API} from "../../const";

class CompanyService {
    async getCompanyPage() {
        const state = store.getState();
        const pageSize = state.table.page.size;
        const pageNumber = state.table.page.number - 1;
        let attr = '?size=' + pageSize + '&page=' + pageNumber;
        return sendRequest(API.EXPANDED_COMPANIES + attr)
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
    async addCompany(companyDTO) {
        return sendRequest(API.COMPANIES, 'POST', JSON.stringify(companyDTO))
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
    async deleteCompany(id){
        return sendRequest(API.COMPANIES + '/' + id,
            'DELETE')
    }
}

export default new CompanyService();
