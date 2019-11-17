import {VALIDATED_FALSE, VALIDATED_TRUE} from "./actions";

const initialState = {
    validated: false
};

const validationReducer = (state = initialState, action) => {
    switch (action.type) {
        case VALIDATED_FALSE:
            return {
                ...state,
                validated: false
            };
        case VALIDATED_TRUE:
            return {
                ...state,
                validated: true
            };
        default:
            return state;
    }
};

export default validationReducer;
