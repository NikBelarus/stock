import React from "react";
import {Route} from "react-router-dom";
import {Container} from "react-bootstrap"

import About from "../../about/AboutContainer";
import LoginForm from "../../authorisation/AuthorisationContainer";
import UserForm from "../../users/creation/CreateUserFormContainer";
import {connect} from "react-redux";
import Home from "../../home/Home";

import "./content.css";
import {logIn, logOut} from "../../authorisation/actions";
import AboutService from "../../about/AboutService";
import CompanyTableContainer from "../../companies/tableView/CompanyTableContainer";
import CarrierTableContainer from "../../carriers/tableView/CarrierTableContainer";
import CreateCompanyContainer from "../../companies/CreateCompanyContainer";
import CreateStockContainer from "../../stocks/CreateStockContainer";
import CreateCellsContainer from "../../stocks/cells/CreateCellsContainer";
import UserHomePage from "../../users/userPage/UserHomePage";
import PaymentPage from "../../payment/PaymentPage";

import OneStockInfoContainer from "../../stocks/onestockinfo/OneStockInfoContainer";
import CompanyWorkersContainer from "../../users/companyworkers/CompanyWorkersContainer";
import StocksInfoContainer from "../../stocks/stocks-info/StocksInfoContainer";
import CellsInfoContainer from "../../stocks/cells/CellsInfoContainer"
import {
    CONTROLLER,
    GUEST,
    STOCK_ADMIN,
    STOCK_DISPATCHER,
    STOCK_MANAGER,
    STOCK_OWNER,
    SYSTEM_ADMIN
} from "../../users/roles";
import CreateTthFormContainer from "../../tth/input/creation/CreationInputTthContainer";
import VerificationInputTthContainer from "../../tth/input/verification/VerificationInputTthContainer";
import CreateCarrierContainer from "../../carriers/creation/CreateCarrierContainer";
import FinancesContainer from "../../finances/FinancesContainer";
import ReportContainer from "../../report/ReportContainer";
import InputRegistrationContainer from "../../tth/input/complete_registration/InputRegistrationContainer";
import VerifiedInputNotesPage from "../../tth/links-pages/VerifiedInputNotesPage";
import RegisteredInputNotesPage from "../../tth/links-pages/RegisteredInputNotesPage";
import RegisteredOutputNotesPage from "../../tth/links-pages/RegisteredOutputNotesPage";
import VerifiedOutputNotesPage from "../../tth/links-pages/VerifiedOutputNotesPage";
import InconsistencyTableContainer from "../../inconsistency/tableView/InconsistencyTableContainer";
import CancellationTableContainer from "../../cancellation/tableView/CancellationTableContainer";
import CreateDriverContainer from "../../driver/creation/CreateDriverContainer";
import CreationOutputTthContainer from "../../tth/output/creation/CreationOutputTthContainer";
import VerificationOutputTthContainer from "../../tth/output/verification/VerificationOutputTthContainer";
import OutputRegistrationContainer from "../../tth/output/complete_registration/OutputRegistrationContainer";
import TthInfoContainer from "../../tth/info/TthInfoContainer";
import {showModal} from "../../info_modal/actions";
import TTHInfoTableContainer from "../../tth/tableView/TTHInfoTableContainer";

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.props.checkAuthorization();
    }

    render() {
        const user = this.props.authorisation.user;
        switch (user.role) {
            case GUEST:
                return (
                    <Container id="content">
                        <Route path="/login" component={LoginForm}/>
                    </Container>
                );
            case SYSTEM_ADMIN:
                return (
                    <Container id="content">
                        <Route exact path="/companies" component={CompanyTableContainer}/>
                        <Route path="/companies/new" component={CreateCompanyContainer}/>
                        <Route path="/finances" component={FinancesContainer}/>
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/userInfo" component={UserHomePage}/>
                    </Container>
                );
            case STOCK_OWNER:
                return (
                    <Container>
                        <Route exact path="/stocks/:stockId" component={OneStockInfoContainer}/>
                        <Route path="/stocks/:stockId/cells" component={CellsInfoContainer}/>
                        <Route exact path="/stocks/new" component={CreateStockContainer}/>
                        <Route exact path="/stocks/new/cells" component={CreateCellsContainer}/>
                        <Route exact path="/stocks" component={StocksInfoContainer}/>
                        <Route path="/users" component={CompanyWorkersContainer}/>
                        <Route path="/pay" component={PaymentPage}/>
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/userInfo" component={UserHomePage}/>
                        <Route path="/companies/stocks/reports/new" component={ReportContainer}/>
                        <Route path="/consignments/:tthId" component={TthInfoContainer}/>
                        <Route exact path="/consignments" component={TTHInfoTableContainer}/>
                        <Route path="/inconsistencies" component={InconsistencyTableContainer}/>
                        <Route path="/cancellations" component={CancellationTableContainer}/>
                        <Route path="/carriers"component={CarrierTableContainer}/>
                    </Container>
                );
            case STOCK_ADMIN:
                return (
                    <Container>
                        <Route exact path="/stocks" component={StocksInfoContainer}/>
                        <Route exact path="/stocks/:stockId" component={OneStockInfoContainer}/>
                        <Route path="/stocks/:stockId/cells" component={CellsInfoContainer}/>
                        <Route exact path="/stock/new/cells" component={CreateCellsContainer}/>
                        <Route path="/users" component={CompanyWorkersContainer}/>
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Route exact path="/stock/new" component={CreateStockContainer}/>
                        <Route path="/user" component={UserForm}/>
                        <Route path="/userInfo" component={UserHomePage}/>
                    </Container>
                );
            case STOCK_DISPATCHER:
                return (
                    <Container id="content">
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/userInfo" component={UserHomePage}/>
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/input_consignment/new" component={CreateTthFormContainer}/>
                        <Route exact path="/carriers" component={CarrierTableContainer}/>
                        <Route path="/carriers/new" component={CreateCarrierContainer}/>
                        <Route path="/drivers/new" component={CreateDriverContainer}/>
                        <Route exact path="/verified__output_consignments" component={VerifiedOutputNotesPage}/>
                        <Route path="/verified__output_consignments/:tthId" component={OutputRegistrationContainer}/>
                    </Container>
                );
            case STOCK_MANAGER:
                return (
                    <Container id="content">
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/userInfo" component={UserHomePage}/>
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/verified__input_consignments/:tthId" component ={InputRegistrationContainer}/>
                        <Route exact path="/verified__input_consignments" component={VerifiedInputNotesPage}/>
                        <Route path="/output_consignment/new" component={CreationOutputTthContainer}/>
                    </Container>
                );
                case CONTROLLER:
                    return (
                        <Container id="content">
                            <Route path="/login" component={LoginForm}/>
                            <Route path="/userInfo" component={UserHomePage}/>
                            <Route path="/about" component={About}/>
                            <Route path="/home" component={Home}/>
                            <Route path="/registered__input_consignments/:tthId" component={VerificationInputTthContainer}/>
                            <Route exact path="/registered__input_consignments" component={RegisteredInputNotesPage}/>
                            <Route exact path="/registered_output_consignment" component={RegisteredOutputNotesPage}/>
                            <Route path="/registered__output_consignments/:tthId" component={VerificationOutputTthContainer}/>
                        </Container>
                    );
            default:
                return (
                    <Container id="content">
                        <Route path="/login" component={LoginForm}/>
                    </Container>
                );
        }
    }

}

export const checkAuthorization = () => {
    return async dispatch => {
        const loginInfo = localStorage.getItem('loginInfo');
        if (loginInfo && loginInfo !== "null") {
            dispatch(logIn(JSON.parse(loginInfo)));
            //отпавляется запрос на защищенный урл для проверки действительности токена
            try {
                const aboutInfo = await AboutService.getAbout();
                if (!aboutInfo.name) {
                    dispatch(logOut());
                }
            }catch (e) {
                dispatch(showModal("Unauthorized", "Please login"));
                dispatch(logOut());
            }
        }
    }
};
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        checkAuthorization: () => dispatch(checkAuthorization())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
