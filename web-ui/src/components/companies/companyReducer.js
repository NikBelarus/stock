import {
    CHANGE_ACTIVE_COMPANY_STOCK,
    SET_ADMIN,
    SET_OWNER,
    CREATE_COMPANY_SUCCESS,
    RECEIVE_COMPANY_STOCKS,
    RESET_COMPANY_CONTENT
} from "./actions";
import {SET_STEP} from "./actions";

const initialState = {
    company: {
        id: null,
        name: "",
        stocks: [],
        //отрицательное число означает просмотр всех складов компании
        activeStockId: -1
    },
    admin: {
        email: "",
        password: "",
        confirmPassword: "",
        role: "STOCK_ADMIN",
        firstName: "",
        lastName: "",
        parentName: "",
        birthdate: "",
        city: "",
        street: "",
        house: "",
        appartment: "",
        companyId: null,
        stockId: null
    },
    owner: {
        email: "",
        password: "",
        confirmPassword: "",
        role: "STOCK_OWNER",
        firstName: "",
        lastName: "",
        parentName: "",
        birthdate: "",
        city: "",
        street: "",
        house: "",
        appartment: "",
        companyId: null,
        stockId: null
    },
    step: 1
};

const companyReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_COMPANY_SUCCESS:
                return {
                    ...state,
                    company: action.createdCompany
                };
            case SET_STEP:
                return {
                    ...state,
                    step: action.step
                };
            case CHANGE_ACTIVE_COMPANY_STOCK:
                return {
                    ...state,
                    company: {
                        ...state.company,
                        activeStockId: action.stockId
                    }
                };
            case RECEIVE_COMPANY_STOCKS:
                return {
                    ...state,
                    company: {
                        ...state.company,
                        stocks: action.stocks
                    }
                };
            case SET_OWNER:
                return {
                    ...state,
                    owner: action.owner
                };
            case SET_ADMIN:
                return {
                    ...state,
                    admin: action.admin
                };
            case RESET_COMPANY_CONTENT:
                return initialState;
            default:
                return state;
        }
    }
;

export default companyReducer;
