import {store} from "../../store";
import sendRequest from "../globalService";
import {API} from "../../const";

class StockService {
    async addStock(stock) {
        return sendRequest(API.STOCKS, 'POST', JSON.stringify(stock))
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
    async getCompanyStocks() {
        return sendRequest(API.STOCKS + "/table")
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

    async getStockStat(){
        const state = store.getState();
        const stockId = state.stock.stockData.id;
        return  sendRequest(API.STOCKS +"/"+stockId+"/stat")
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

    async deleteStock(id) {
        return sendRequest(API.STOCKS+ '/' + id,
            'DELETE')
    }

    async getStockCells(stockId){
        return sendRequest(API.STOCK_CELLS +'/' + stockId);
    }
}

export default new StockService();
