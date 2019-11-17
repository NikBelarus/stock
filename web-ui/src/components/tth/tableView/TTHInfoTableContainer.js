import {connect} from "react-redux";
import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import Container from "react-bootstrap/Container";
import {changePage, receivePageInfo} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import Loading from "../../loading/Loading";
import {resetTableContent} from "../../basecomponents/actions";
import TthService from "../TthService";
import TTHInfoTable from "./TTHInfoTable";

class TTHInfoTableContainer extends React.Component {
    componentDidMount() {
        this.props.fetchTTHPage();
    }

    componentWillUnmount() {
        this.props.resetTable();
    }

    onPageChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        this.props.changePage(page, sizePerPage);
        this.props.fetchTTHPage();
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

        return (
            <Container>
                <TTHInfoTable onPageChange={this.onPageChange.bind(this)}
                                     {...this.props}/>
            </Container>
        );
    }
}


export const fetchTTHPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const response = await TthService.fetchGetAllConsignmentsForCompany();
            dispatch(receivePageInfo(response));
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal("Error ", e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        ...state,
        modal: state.modal,
        page: state.table.page,
        data: state.table.page.content,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTTHPage: () => dispatch(fetchTTHPage()),
        showModal: (header, message) => dispatch(showModal(header, message)),
        changePage: (number, size) => dispatch(changePage(number, size)),
        resetTable:() => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TTHInfoTableContainer);
