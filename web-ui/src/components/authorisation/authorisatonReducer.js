import {GUEST} from "../users/roles";
import {LOG_IN, LOG_OUT} from "./actions";


const initialState = {
    login: {
        email: "",
        password: ""
    },
	authorized: false,
    user: {
        id: null,
        role: GUEST,
        firstName: "",
        lastName: "",
        parentName: "",
        email: "",
        birthdate: null,
        city: "",
        street: "",
        house: null,
        appartment: null,
        companyId: null,
        stockId: null
    },
    accessToken:"",
    tokenType: ""
};

const authorisationReducer = (state = initialState, action) => {
	switch (action.type) {
        case LOG_IN:
            const storLogInfo = localStorage.getItem('loginInfo');
            const strLogInfo = JSON.stringify(action.payload);
            if(!storLogInfo || storLogInfo !== strLogInfo){
                localStorage.setItem('loginInfo', strLogInfo);
            }
			return {
				...state,
                authorized: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                tokenType: action.payload.tokenType
			};
		case LOG_OUT:
		    localStorage.removeItem('loginInfo');
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default authorisationReducer;
