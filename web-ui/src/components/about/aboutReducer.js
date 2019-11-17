import { ABOUT_INFO_SUCCESS } from "./actions";

const initialState = {
    info: {
        name: "",
        version: "",
        groupName: ""
    }
};

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ABOUT_INFO_SUCCESS:
            return {
                ...state,
                info: action.aboutInfo
            };
        default:
            return state
    }
};

export default aboutReducer;
