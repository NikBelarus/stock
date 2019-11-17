import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import InconsistencyService from "../InconsistencyService";
import InconsistencyInfoTable from "./InconsistencyInfoTable";
import {changePage, receivePageInfo} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {connect} from "react-redux";
import {resetTableContent} from "../../basecomponents/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import Loading from "../../loading/Loading";
import {chooseInconsistency} from "../action";

class InconsistencyTableContainer extends React.Component {

    componentDidMount() {
        this.props.fetchInconsistencyPage();
    }
    componentWillUnmount() {
        this.props.resetTable();
    }

    handleRedirect = (actId) => {
        this.props.setCurrentInconsistency(actId);
    };

    onPageChange(type, {page, sizePerPage}) {
        this.props.changePage(page, sizePerPage);
        this.props.fetchInconsistencyPage();
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
                <FieldTitle text="Inconsistency acts info"/>
                <Container>
                    <InconsistencyInfoTable
                        onPageChange={this.onPageChange.bind(this)}
                        handleRedirect ={this.handleRedirect.bind(this)}
                        {...this.props} />
                </Container>
            </article>
        );
    }
}

export const fetchInconsistencyPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const inconsistencyPageInfo = await InconsistencyService.getInconsistencyPage();
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(inconsistencyPageInfo));
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
        fetchInconsistencyPage: () => dispatch(fetchInconsistencyPage()),
        changePage: (number, size) => dispatch(changePage(number, size)),
        setCurrentInconsistency: (actId) => dispatch(chooseInconsistency(actId)),
        resetTable: () => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InconsistencyTableContainer);
