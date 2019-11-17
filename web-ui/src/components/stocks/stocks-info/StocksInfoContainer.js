import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
    addToDelete,
    addToDeleteAll,
    deleteFromTableContent,
    receivePageInfo
} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {connect} from "react-redux";
import StockService from "../StockService";
import StocksTable from "./StocksTable";
import {chooseStock} from "../onestockinfo/action";
import Loading from "../../loading/Loading";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {resetTableContent} from "../../basecomponents/actions";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

class StocksInfoContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { locations:[] };
    }

    componentDidMount() {
        this.props.fetchCompanyStocks();
    }

    componentWillUnmount() {
        this.props.resetTable();
    }

    onDeleteRow() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you really want to delete that data?")) {
            const selected = this.props.selected;
            selected.forEach(row => {
                const id = this.props.page.content.find(stock => stock.id === row.id).id;
                this.props.fetchDelete(id);
                this.props.deleteFromContent(id);
            })
        }
    }

    handleRedirect = (stockId) => {
        this.props.setCurrentStock(stockId);
    };

    handleOnSelect = (row, isSelect) => {
        this.props.addToDelete(row, isSelect);
    };

    handleOnSelectAll = (isSelectAll, rows) => {
        this.props.addToDeleteAll(isSelectAll, rows);
    };


    render() {
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>{
            const stocks = this.props.page.content;

            const markers = stocks.map(function(stock, i) {
              return <Marker position={{ 
                    lat: stock.latitude,
                    lng: stock.longitude
                }}></Marker>
            });

            return(
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: 53.9, lng: 27.56667}}
            >
            {markers}
            </GoogleMap>)
        }));

        if (isShown) {
            return <InfoModalContainer/>
        }

        if (loading) {
            return <Loading/>;
        }

        return (
            <article id="stock-table-container">
                <FieldTitle text="Stocks info"/>
                <div id="map">
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGmR6yu8KkNXWuQQOJ-4tacQ7CsDJXlMM&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <Container>
                    <ButtonToolbar>
                        <Link className="btn btn-success" to="/stock/new">New stock</Link>
                        <Button variant="danger" onClick={this.onDeleteRow.bind(this)}>Delete</Button>
                    </ButtonToolbar>
                    <StocksTable onDeleteRow={this.onDeleteRow.bind(this)}
                                 onSelect={this.handleOnSelect.bind(this)}
                                 onSelectAll={this.handleOnSelectAll.bind(this)}
                                 handleRedirect ={this.handleRedirect.bind(this)}
                                 {...this.props}/>
                </Container>
            </article>
        );
    }
}

export const fetchCompanyStocks = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const stocksInfo = await StockService.getCompanyStocks();
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(stocksInfo));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
        }
    };
};

export const fetchDelete = (id) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            await StockService.deleteStock(id);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error: ', e.message))
        }
    }
};

const mapStateToProps = state => {
    return {
        ...state,
        modal: state.modal,
        page: state.table.page,
        data: state.table.page.content,
        selected: state.table.toDelete
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDelete: (id) => dispatch(fetchDelete(id)),
        fetchCompanyStocks: () => dispatch(fetchCompanyStocks()),
        setCurrentStock: (stockId) => dispatch(chooseStock(stockId)),
        addToDelete: (row, isSelect) => dispatch(addToDelete(row, isSelect)),
        addToDeleteAll: (isSelect, rows) => dispatch(addToDeleteAll(isSelect, rows)),
        deleteFromContent: (id) => dispatch(deleteFromTableContent(id)),
        resetTable: () => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksInfoContainer);
