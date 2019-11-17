import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import {
    receivePageInfo
} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {connect} from "react-redux";
import CellsService from "./CellsService";
import CellsTable from "./CellsTable";
import Loading from "../../loading/Loading";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {resetTableContent} from "../../basecomponents/actions";

class StocksInfoContainer extends React.Component {

    componentDidMount() {
        let stockId = this.props.match.params.stockId;
        this.props.fetchStockCells(stockId);
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
            <article id="stock-table-container">
                <FieldTitle text="Cells info"/>
                <Container>
                    <CellsTable {...this.props}/>
                </Container>
            </article>
        );
    }
}

export const fetchStockCells = (stockId) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const cellsInfo = await CellsService.getStockCells(stockId);
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(cellsInfo));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
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
        fetchStockCells: (stockId) => dispatch(fetchStockCells(stockId)),
        resetTable: () => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksInfoContainer);
