import sendRequest from "../../globalService";
import {API} from "../../../const";

class CellsService {
    async addCells(cells, companyId) {
        const URL = API.STOCK_CELLS;
        return sendRequest(URL, 'POST', JSON.stringify(cells))
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data.object;
            });
    }
    async getStockCells(stockId){
        const URL= API.STOCK_CELLS;
        return sendRequest(URL + "?stock_id=" + stockId)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}

export default new CellsService();
