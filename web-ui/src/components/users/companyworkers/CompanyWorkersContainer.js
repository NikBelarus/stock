import React from "react";
import {connect} from "react-redux";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import CompanyWorkersTableContainer from "./CompanyWorkersTableContainer";
import {showModal} from "../../info_modal/actions";
import {changeActiveCompanyStock, receiveCompanyStocks} from "../../companies/actions";
import StockService from "../../stocks/StockService";
import UserService from "../UserService";
import {receivePageInfo} from "../../basecomponents/table/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";

class CompanyWorkersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.changeCurrentStock.bind(this);
    }

    componentDidMount() {
        this.props.fetchCompanyStocks();
    }

    changeCurrentStock = (e) => {
        const stockId = Number(e.target.value);
        this.props.changeActiveCompanyStock(stockId);
        this.props.fetchUsersPage();
    };

    render() {
        let stocksListItems = this.props.stocks.map(stock => (
            <Dropdown.Item as="button" value={stock.id} onClick={this.changeCurrentStock}>
                {stock.city + ' ' + stock.street + ' '}
            </Dropdown.Item>
        ));
        return (
            <article>
                <FieldTitle text="Company workers"/>
                <Container>
                    <Container>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary" id="stockDropdown">
                                Company Stocks
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button" value={-1} onClick={this.changeCurrentStock}>Все
                                    склады</Dropdown.Item>
                                {stocksListItems}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <p/>
                    <CompanyWorkersTableContainer
                        {...this.props}
                    />
                </Container>
            </article>
        )
    }
}

export const fetchCompanyStocks = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const companyStocks = await StockService.getCompanyStocks();
            dispatch(receiveCompanyStocks(companyStocks.content));
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
        }
    };
};

export const fetchUsersPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const userPageInfo = await UserService.getStockUsersPage();
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(userPageInfo));
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
        stocks: state.company.company.stocks,
        activeStock: state.company.activeStockId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompanyStocks: () => dispatch(fetchCompanyStocks()),
        fetchUsersPage: () => dispatch(fetchUsersPage()),
        changeActiveCompanyStock: (id) => dispatch(changeActiveCompanyStock(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyWorkersContainer);
