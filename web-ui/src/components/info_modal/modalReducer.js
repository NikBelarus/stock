import {HIDE_MODAL, SHOW_MODAL} from "./actions";

const initialState = {
    isShown: false,
    header: "",
    message: ""
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isShown: true,
                header: action.payload.header,
                message: action.payload.message
            };
        case HIDE_MODAL:
            return {
                ...state,
                isShown: false,
                header: "",
                message: ""
            };
        default:
            return state;
    }
};

export default modalReducer;
