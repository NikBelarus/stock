import {CHANGE_CONSIGNMENT_TYPE_FOR_INFO_TABLE, SET_SELECTED_TTH} from "../actions";

const initialState = {
    consignmentType: null,
    tth: {}
};

const TTHInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CONSIGNMENT_TYPE_FOR_INFO_TABLE:
            return {
                ...state,
                consignmentType: action.consType
            };
        case SET_SELECTED_TTH:
            return {
                ...state,
                tth: action.tth
            };
        default:
            return state;
    }
};

export default TTHInfoReducer;
