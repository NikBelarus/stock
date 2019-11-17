import {RECEIVE_COMPANIES_REPORT, RECEIVE_YEAR_REPORT} from "./actions";

const initialState = {
    yearReportData: {
        values: []
    },
    companiesReportData: {
        companies: [{
            name: "",
            sum: 0
        },
        {
            name: "",
            sum: 0
        },
        {
            name: "",
            sum: 0
        },
        {
            name: "",
            sum: 0
        },
        {
            name: "",
            sum: 0
        }
        ]
    }
};

const financesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_YEAR_REPORT:
            return {
                ...state,
                yearReportData: {
                    values: action.yearReport
                }
            };
        case RECEIVE_COMPANIES_REPORT:
            return {
                ...state,
                companiesReportData: {
                    companies: action.companiesReport
                }
            };
        default:
            return state;
    }
};

export default financesReducer;
