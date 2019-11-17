import sendRequest from "../globalService";
import {API} from "../../const";

class FinancesService {

    async getYearReport() {
        return sendRequest(API.PAY + '/year_report')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }

    async getCompaniesReport() {
        return sendRequest(API.PAY + '/companies_report')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}

export default new FinancesService();
