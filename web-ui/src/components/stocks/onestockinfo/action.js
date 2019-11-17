export const STOCK_STAT_SUCCESS = "onestockinfo/STOCK_STAT_SUCCESS"
export const CHOOSE_STOCK ="onestockinfo/CHOOSE_STOCK";

export const receiveStockStat = stockStat => {
    return {
        type: STOCK_STAT_SUCCESS,
        stockStat
    }
};

export const chooseStock = stockId => {
    return{
        type: CHOOSE_STOCK,
        stockId
    }
};
