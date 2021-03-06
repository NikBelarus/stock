import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import CarrierService from "../CarrierService";
import CarrierInfoTable from "./CarrierInfoTable";
import {
    addToDelete,
    addToDeleteAll,
    changePage,
    deleteFromTableContent,
    receivePageInfo
} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import {connect} from "react-redux";
import {resetTableContent} from "../../basecomponents/actions";

class CarrierTableContainer extends React.Component {

    componentDidMount() {
        this.props.resetTable();
        this.props.fetchCarrierPage();
    }

    onPageChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        this.props.changePage(page, sizePerPage);
    }

    onDeleteRow() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you really want to delete that data?")) {
            const selected = this.props.selected;
            selected.forEach(row => {
                const id = this.props.page.content.find(carrier => carrier.name === row.name).id;
                this.props.fetchDelete(id);
                this.props.deleteFromContent(id);
            })
        }
    }

    handleOnSelect = (row, isSelect) => {
        this.props.addToDelete(row, isSelect);
    };

    handleOnSelectAll = (isSelectAll, rows) => {
        this.props.addToDeleteAll(isSelectAll, rows);
    };

    render() {
        const {isShown} = this.props.modal;
        if (isShown) {
            return <InfoModalContainer/>
        }
        return (
            <article>
                <FieldTitle text="Carriers info"/>
                <Container>
                    <ButtonToolbar>
                        <Link className="btn btn-success" to="/carriers/new">New carrier</Link>
                        <Button variant="danger" onClick={this.onDeleteRow.bind(this)}>Delete</Button>
                    </ButtonToolbar>
                    <CarrierInfoTable onPageChange={this.onPageChange.bind(this)}
                                      onDeleteRow={this.onDeleteRow.bind(this)}
                                      onSelect={this.handleOnSelect.bind(this)}
                                      onSelectAll={this.handleOnSelectAll.bind(this)}
                                      {...this.props}/>
                </Container>
            </article>
        );
    }
}

export const fetchCarrierPage = () => {
    return async dispatch => {
        try {
            const carrierPageInfo = await CarrierService.getCarrierPage();
            dispatch(receivePageInfo(carrierPageInfo));
        } catch (e) {
            dispatch(showModal('Error ', e.message));
        }
    };
};

export const fetchDelete = (id) => {
    return async dispatch => {
        try {
            await CarrierService.deleteCarrier(id);
        } catch (e) {
            dispatch(showModal('Error: ', e.message))
        }
    }
};

const mapStateToProps = state => {
    return {
        modal:state.modal,
        page:state.table.page,
        data: state.table.page.content,
        selected: state.table.toDelete
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDelete: (id) => dispatch(fetchDelete(id)),
        fetchCarrierPage: () => dispatch(fetchCarrierPage()),
        changePage: (number, size) => dispatch(changePage(number, size)),
        addToDelete: (row, isSelect) => dispatch(addToDelete(row, isSelect)),
        addToDeleteAll: (isSelect, rows) => dispatch(addToDeleteAll(isSelect, rows)),
        deleteFromContent: (id) => dispatch(deleteFromTableContent(id)),
        resetTable:()=>dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierTableContainer);
