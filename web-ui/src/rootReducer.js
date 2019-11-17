import { combineReducers } from 'redux'

import aboutReducer from "./components/about/aboutReducer";
import authorisationReducer from "./components/authorisation/authorisatonReducer";
import userCreationReducer from "./components/users/creation/userCreationReducer";
import validationReducer from "./components/validation/validationReducer";
import modalReducer from "./components/info_modal/modalReducer";
import loadingReducer from "./components/loading/loadingReducer";
import tableReducer from "./components/basecomponents/table/tableReducer";
import stockReducer from "./components/stocks/stockReducer";
import companyReducer from "./components/companies/companyReducer";
import carriageReducer from "./components/carriage/carriageReducer";
import tthReducer from "./components/tth/tthReducer";
import cellsReducer from "./components/stocks/cells/cellsReducer";
import carrierReducer from "./components/carriers/carrierReducer";
import countTableReducer from "./components/tth/good_schecking_table/countTableReduser";
import financesReducer from "./components/finances/financesReducer";
import reportReducer from "./components/report/ReportReducer"
import tthAccommodationReducer from "./components/tth/input/complete_registration/TthAccommodationReducer";
import notesPageReducer from "./components/tth/links-pages/notesPagesPeducer";
import driverReducer from "./components/driver/driverReducer";
import TTHInfoReducer from "./components/tth/tableView/TTHInfoReducer";

const rootReducer = combineReducers({
    about: aboutReducer,
    authorisation: authorisationReducer,
    user: userCreationReducer,
    table: tableReducer,
    validation: validationReducer,
    modal: modalReducer,
    loading: loadingReducer,
    stock: stockReducer,
    company: companyReducer,
    carrier: carrierReducer,
    carriage: carriageReducer,
    cells: cellsReducer,
    finances: financesReducer,
    tth: tthReducer,
    countTable: countTableReducer,
    report: reportReducer,
    accommodation: tthAccommodationReducer,
    notes: notesPageReducer,
    drivers: driverReducer,
    tthInfoTable: TTHInfoReducer
});

export default rootReducer;
