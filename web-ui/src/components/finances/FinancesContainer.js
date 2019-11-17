import React from "react";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import {connect} from "react-redux";
import {Bar} from "react-chartjs-2";
import {Pie} from "react-chartjs-2";
import {showModal} from "../info_modal/actions";
import FinancesService from "./FinancesService";
import Container from "react-bootstrap/Container";
import * as colors from "../diagrams/financesReportsColors";
import {receiveCompaniesReport, receiveYearReport} from "./actions";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";
import Loading from "../loading/Loading";
import Row from "react-bootstrap/Row";

class FinancesContainer extends React.Component {

    componentDidMount() {
        this.props.fetchReportsInfo();
    }

    render() {
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        if (isShown) {
            return <InfoModalContainer/>
        }
        if (loading) {
            return <Loading/>;
        }

        const options = {
            legend: {
                position: 'right',
                labels: {
                    fontSize: 19,
                    boxWidth: 40
                }
            }
        };

        const {yearReportData} = this.props.finances;
        const {companiesReportData} = this.props.finances;

        const yearReport = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Amount in dollars',
                backgroundColor: colors.backgroundBarColor,
                borderColor: colors.backgroundBarBorderColor,
                borderWidth: 2,
                hoverBackgroundColor: colors.hoverBackgroundBarColor,
                hoverBorderColor: colors.hoverBackgroundBarBorderColor,
                data: yearReportData.values
            }]
        };

        const companiesReport = {
            labels: companiesReportData.companies.map((item) => item.name),
            datasets: [{
                backgroundColor: colors.backgroundPieColor,
                hoverBackgroundColor: colors.hoverBackgroundPieColor,
                data: companiesReportData.companies.map((item) => item.sum)
            }]
        };

        return (
            <Row >
                <FieldTitle text="Year finances report"/>
                <Container className="align-items-stretch">
                    <Bar data={yearReport} options={options}/>
                </Container>
                <FieldTitle text="Five most profitable companies"/>
                <Container>
                    <Pie data={companiesReport} options={options}/>
                </Container>
            </Row>
        )
    }
}

export const fetchReportsInfo = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const yearReport = await FinancesService.getYearReport();
            const companiesReport = await FinancesService.getCompaniesReport();
            dispatch(receiveYearReport(yearReport));
            dispatch(receiveCompaniesReport(companiesReport));
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        ...state,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchReportsInfo: () => dispatch(fetchReportsInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancesContainer);
