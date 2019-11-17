import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import CancellationService from "../CancellationService";
import CancellationInfoTable from "./CancellationInfoTable";
import {changePage, receivePageInfo} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {connect} from "react-redux";
import {resetTableContent} from "../../basecomponents/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import Loading from "../../loading/Loading";
import {chooseCancellation} from "../action";

class CancellationTableContainer extends React.Component {

    componentDidMount() {
        this.props.fetchCancellationPage();
    }
    componentWillUnmount() {
        this.props.resetTable();
    }

    handleRedirect = (actId) => {
        this.props.setCurrentCancellation(actId);
    };

    onPageChange(type, {page, sizePerPage}) {
        this.props.changePage(page, sizePerPage);
        this.props.fetchCancellationPage();
    }

    render() {
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        if (isShown) {
            return <InfoModalContainer/>
        }
        if (loading) {
            return <Loading/>
        }
        return (
            <article>
                <FieldTitle text="Cancellation acts info"/>
                <Container>
                    <CancellationInfoTable
                        onPageChange={this.onPageChange.bind(this)}
                        handleRedirect ={this.handleRedirect.bind(this)}
                        {...this.props} />
                </Container>
            </article>
        );
    }
}

export const fetchCancellationPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const cancellationPageInfo = await CancellationService.getCancellationPage();
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(cancellationPageInfo));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        modal: state.modal,
        page: state.table.page
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCancellationPage: () => dispatch(fetchCancellationPage()),
        changePage: (number, size) => dispatch(changePage(number, size)),
        setCurrentCancellation: (actId) => dispatch(chooseCancellation(actId)),
        resetTable: () => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancellationTableContainer);
