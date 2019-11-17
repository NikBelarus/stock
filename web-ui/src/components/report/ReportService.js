import {API} from "../../const";

class ReportService {
    async getStats(companyId, startDate, lastDate){
        const headers = new Headers();
        headers.append('companyId', companyId);
        headers.append('startDate', startDate);
        headers.append('lastDate', lastDate);
        return fetch(API.REPORT + "/stats", {
            headers: headers,
            method: 'GET'
        })
        .then(function (response) {
            if(response.ok) {
                return response.json();
            } else{
                throw new Error(response.message)
            }        })
        .then(data => {
            return data;
        });
    }
}

export default new ReportService();
