import {
    RECEIVE_INPUT_REGISTERED_TTH_LIST,
    RECEIVE_INPUT_VERIFIED_TTH_LIST,
    RECEIVE_OUTPUT_REGISTERED_TTH_LIST, RECEIVE_OUTPUT_VERIFIED_TTH_LIST
} from "./actions";

const initialState = {
    registeredInputTthList: [],
    registeredOutputTthList: [],
    verifiedInputTthList: [],
    verifiedOutputTthList: []
};

const notesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_INPUT_REGISTERED_TTH_LIST:{
            return {
                ...state,
                registeredInputTthList: action.list
            }
        }
        case RECEIVE_OUTPUT_REGISTERED_TTH_LIST:{
            return {
                ...state,
                registeredOutputTthList: action.list
            }
        }
        case RECEIVE_INPUT_VERIFIED_TTH_LIST:{
            return {
                ...state,
                verifiedInputTthList: action.list
            }
        }
        case RECEIVE_OUTPUT_VERIFIED_TTH_LIST:{
            return {
                ...state,
                verifiedOutputTthList: action.list
            }
        }
        default:
            return state
    }
};

export default notesPageReducer;
