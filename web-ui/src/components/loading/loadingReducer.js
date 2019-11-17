import {LOADING_FALSE, LOADING_TRUE} from "./actions";

const initialState = {
    loading: false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_FALSE:
            return {
                ...state,
                loading: false
            };
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default loadingReducer;
