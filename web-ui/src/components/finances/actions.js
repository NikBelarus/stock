export const RECEIVE_YEAR_REPORT = "finances/RECEIVE_YEAR_REPORT";
export const RECEIVE_COMPANIES_REPORT ="finances/RECEIVE_COMPANIES_REPORT";

export const receiveYearReport = yearReport => {
    return {
        type: RECEIVE_YEAR_REPORT,
        yearReport: yearReport
    }
};

export const receiveCompaniesReport = companiesReport => {
    return{
        type: RECEIVE_COMPANIES_REPORT,
        companiesReport: companiesReport
    }
};
