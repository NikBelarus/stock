export const CREATE_COMPANY_SUCCESS = "companies/CREATE_COMPANY_SUCCESS";
export const SET_STEP = "companies/SET_STEP";
export const RECEIVE_COMPANY_STOCKS="companies/RECEIVE_COMPANY_STOCKS";
export const CHANGE_ACTIVE_COMPANY_STOCK ="companies/CHANGE_ACTIVE_COMPANY_STOCK";
export const SET_OWNER = "company/SET_OWNER";
export const SET_ADMIN = "company/SET_ADMIN";
export const RESET_COMPANY_CONTENT ="company/RESET_COMPANY_CONTENT";

export const changeActiveCompanyStock = stockId =>{
    return{
        type: CHANGE_ACTIVE_COMPANY_STOCK,
        stockId
    }
};

export const receiveCompanyStocks = stocks => {
    return{
        type:RECEIVE_COMPANY_STOCKS,
        stocks
    }
};

export const receiveCompanyCreateResult = createdCompany => {
    return {
        type: CREATE_COMPANY_SUCCESS,
        createdCompany
    };
};

export const setStep = step => {
    return {
        type: SET_STEP,
        step
    };
};

export const setOwner = owner => {
    return {
        type: SET_OWNER,
        owner
    };
};

export const setAdmin = admin => {
    return {
        type: SET_ADMIN,
        admin
    };
};

export const resetCompanyContent = () => {
    return{
        type: RESET_COMPANY_CONTENT
    }
}
