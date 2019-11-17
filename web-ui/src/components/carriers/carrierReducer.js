import {CREATE_CARRIER_SUCCESS} from "./actions";

const initialState = {
    carrier: {
        name: "",
        companyId: null
    }
};

const CarrierReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_CARRIER_SUCCESS:
                return {
                    ...state,
                    carrier: action.createdCarrier
                };
            default:
                return state;
        }
    }
;

export default CarrierReducer;
