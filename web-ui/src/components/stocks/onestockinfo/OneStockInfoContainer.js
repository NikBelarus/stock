import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import {Doughnut} from "react-chartjs-2";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {backgroundColor, hoverBackgroundColor} from "../../diagrams/diagramoptions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {showModal} from "../../info_modal/actions";
import StockService from "../StockService";
import {chooseStock, receiveStockStat} from "./action";
import {CONTROLLER, STOCK_DISPATCHER, STOCK_MANAGER} from "../../users/roles";
import {FREEZER, HEATED, NOT_HEATED, OUTDOOR} from "../cells/storageConditions";
import {Link} from "react-router-dom";

class OneStockInfoContainer extends React.Component {

    componentDidMount() {
        let stockId =this.props.match.params.stockId;
        this.props.setCurrentStock(stockId);
        this.props.fetchStockIfo();
    }

    conditonLabels = [
        'Heated',
        'Not heated',
        'Freezer',
        'Outdoor'
    ];

    cellsOccupancyLabels = [
        'Filled cells',
        'Partially filled cells',
        'Empty cells'
    ];

    render() {
        const {isShown} = this.props.modal;
        if (isShown) {
            return <InfoModalContainer/>
        }

        const stock = this.props.stock;

        function computeStatistics(stock) {
            return {
                workers: {
                    dispatchers: stock.workers.filter(worker => worker.role === STOCK_DISPATCHER).length,
                    managers: stock.workers.filter(worker => worker.role === STOCK_MANAGER).length,
                    controllers: stock.workers.filter(worker => worker.role === CONTROLLER).length,
                },
                cells: {
                    heated: stock.cells.filter(cell => cell.storageCondition === HEATED).length,
                    notHeated: stock.cells.filter(cell => cell.storageCondition === NOT_HEATED).length,
                    freezer: stock.cells.filter(cell => cell.storageCondition === FREEZER).length,
                    outdoor: stock.cells.filter(cell => cell.storageCondition === OUTDOOR).length
                }
            }
        }

        const stockStat = computeStatistics(stock);
        const cellsData = [stockStat.cells.heated,
            stockStat.cells.notHeated,
            stockStat.cells.freezer,
            stockStat.cells.outdoor];
        return (
            <article>
                <FieldTitle text="Stock information"/>
                <Container className="justify-content-left">
                    <p>
                        <b>Address: </b> {stock.city + " "
                    + stock.street + " "
                    + stock.house}
                    </p>
                    <p>
                        <b>Workers number: </b> {stock.workers.length}
                        <ul>
                            <li>
                                dispatchers: {stockStat.workers.dispatchers}
                            </li>
                            <li>
                                managers: {stockStat.workers.managers}
                            </li>
                            <li>
                                controllers: {stockStat.workers.controllers}
                            </li>
                        </ul>
                    </p>
                    <Row>
                        <Col>
                            <b>Cells number: </b> {stock.cells.length}
                            <ul>
                                <li>heated: {stockStat.cells.heated}</li>
                                <li>not hea {stockStat.cells.notHeated}</li>
                                <li>freezer:{stockStat.cells.freezer}</li>
                                <li>outdoor:{stockStat.cells.outdoor}</li>
                            </ul>
                        </Col>
                        <Col>
                            <Doughnut data={
                                {
                                    labels: this.conditonLabels,
                                    datasets: [{
                                        backgroundColor: backgroundColor,
                                        hoverBackgroundColor: hoverBackgroundColor,
                                        data: cellsData
                                    }]
                                }
                            }/>
                        </Col>
                    </Row>
                    <Link to={"/stocks/" + stock.id + "/cells"}>View cells list</Link>
                </Container>

            </article>
        )
    }
}

export const fetchStockInfo = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const stockStat = await StockService.getStockStat();
            dispatch(setLoadingFalse());
            dispatch(receiveStockStat(stockStat));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        ...state,
        stock: state.stock.stockData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStockIfo: () => dispatch(fetchStockInfo()),
        setCurrentStock: (stockId) => dispatch(chooseStock(stockId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneStockInfoContainer);
