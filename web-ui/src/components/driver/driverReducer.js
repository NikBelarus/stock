import {CREATE_DRIVER_SUCCESS} from "./actions";

const initialState = {
    driver: {
        firstName: "",
        lastName: "",
        passportNo: "",
        issueCountry: "",
        carrierId: null
    }
};

const DriverReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_DRIVER_SUCCESS:
                return {
                    ...state,
                    driver: action.createdDriver
                };
            default:
                return state;
        }
    }
;

export default DriverReducer;
