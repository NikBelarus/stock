import {
    RECEIVE_CARRIERS_LIST,
    RECEIVE_DRIVERS_LIST, RESET_CARRIAGE,
    SELECT_CARRIER,
    SELECT_DRIVER,
    SELECT_VEHICLE_TYPE, TYPE_VEHICLE_NO
} from "./actions";

const initialState = {
    carriers: {
        selectedCarrier: null,
        list: []
    },
    vehicleType:"",
    vehicleNo:"",
    drivers: {
        selectedDriver: null,
        list: []
    }
};

const carriageReducer = (state = initialState, action) =>{
    switch(action.type){
        case RECEIVE_DRIVERS_LIST:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    list: action.list
                }
            };
        case RECEIVE_CARRIERS_LIST:
            return  {
                ...state,
                carriers: {
                    ...state.carriers,
                    list: action.list
                }
            };
        case SELECT_DRIVER :
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    selectedDriver: action.driver
                }
            };
        case SELECT_CARRIER:
            return {
                ...state,
                carriers: {
                    ...state.carriers,
                    selectedCarrier: action.carrier
                }
            };
        case SELECT_VEHICLE_TYPE:
            return {
                ...state,
                vehicleType: action.vehicleType
            };
        case RESET_CARRIAGE:
            return {
                ...state,
                vehicleType:"",
                vehicleNo:"",
                carriers: {
                    ...state.carriers,
                    selectedCarrier: null
                },
                drivers: {
                    ...state.drivers,
                    selectedDriver: null
                }
            };
        case TYPE_VEHICLE_NO:
            return {
                ...state,
                vehicleNo: action.no
            };
        default:
            return state;

    }
};

export default carriageReducer;
