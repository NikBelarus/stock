export const CREATE_STOCK_SUCCESS = "stock/CREATE_STOCK_SUCCESS";
export const SET_BUTTON_VISIBILITY = "stock/SET_BUTTON_VISIBILITY";
export const SET_LOCATION = "stock/SET_LOCATION";

export const receiveStockCreateResult = createdStock => {
    return {
        type: CREATE_STOCK_SUCCESS,
        createdStock
    };
};

export const setButtonVisibility = buttonVis => {
    return {
        type: SET_BUTTON_VISIBILITY,
        buttonVis
    };
};

export const setLocation = location => {
    return {
        type: SET_LOCATION,
        location
    };
};