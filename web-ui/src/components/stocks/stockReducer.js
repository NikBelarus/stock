import {CREATE_STOCK_SUCCESS} from "./action";
import {SET_LOCATION} from "./action";
import {SET_BUTTON_VISIBILITY} from "./action";
import {CHOOSE_STOCK, STOCK_STAT_SUCCESS} from "./onestockinfo/action";


const initialState = {
    stock: {
        id: null,
        companyId: null,
        city: "",
        street: "",
        house: null,
        latitude: null,
        longitude: null
    },
    buttonVis: "none",
    location: {
        lat: 53.9,
        lng: 27.56667
    },
    stockData: {
        id: 0,
        city: "",
        street: "",
        house: "",
        latitude: 0,
        longitude: 0,
        cells: [],
        workers: []
    }
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STOCK_SUCCESS:
            return {
                ...state,
                stock: action.createdStock
            };
        case SET_LOCATION:
            return {
                ...state,
                location: action.location
            };
        case SET_BUTTON_VISIBILITY:
            return {
                ...state,
                buttonVis: action.buttonVis
            };
        case STOCK_STAT_SUCCESS:
            return {
                ...state,
                stockData: {
                    ...state.stockData,
                    ...action.stockStat
                }
            };
        case CHOOSE_STOCK:
            return {
                ...state,
                stockData: {
                    ...state.stockData,
                    id: action.stockId
                }
            };
        default:
            return state;
    }
};

export default stockReducer;
