import React from "react";
import {Col, Button} from "react-bootstrap";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Loading from "../../loading/Loading";
import CellsService from "./CellsService";
import {receiveCellsCreateResult} from "./action";
import {setValidFalse, setValidTrue} from "../../validation/actions";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {showModal} from "../../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";

class CreateCellsContainer extends React.Component{
	render(){
		const {cells} = this.props.cells;
		const {stock} = this.props.stock;
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;

        const handleSubmit = async (e) => {
        	e.preventDefault();
            const form = e.currentTarget;
            if(e.target.elements.cell1.value <= 0 || e.target.elements.cell2.value <= 0 || e.target.elements.cell3.value <= 0 || e.target.elements.cell4.value <= 0){
                this.props.callInfoModal('Warning', 'The cell\'s value is invalid.');
            } else if(e.target.elements.volume1.value <= 0 || e.target.elements.volume2.value <= 0 || e.target.elements.volume3.value <= 0 || e.target.elements.volume4.value <= 0){
            	this.props.callInfoModal('Warning', 'The volume\'s value is invalid.');
            } else if (!form.checkValidity()) {
                this.props.setValid(true);
            } else {
            	cells[0].stockId = stock.id;
            	cells[0].volume = e.target.elements.volume1.value;
            	cells[0].cellsCount = e.target.elements.cell1.value;
                cells[0].cellPrice = e.target.elements.cellPrice1.value;

            	cells[1].stockId = stock.id;
            	cells[1].volume = e.target.elements.volume2.value;
            	cells[1].cellsCount = e.target.elements.cell2.value;
                cells[1].cellPrice = e.target.elements.cellPrice2.value;

            	cells[2].stockId = stock.id;
            	cells[2].volume = e.target.elements.volume3.value;
            	cells[2].cellsCount = e.target.elements.cell3.value;
                cells[2].cellPrice = e.target.elements.cellPrice3.value;

            	cells[3].stockId = stock.id;
            	cells[3].volume = e.target.elements.volume4.value;
            	cells[3].cellsCount = e.target.elements.cell4.value;
                cells[3].cellPrice = e.target.elements.cellPrice4.value;

            	this.props.fetchCellsCreate(cells, stock.companyId);
            }
        };

        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>;
        }

        return(
            <div id="stock-container">
                <FieldTitle text="Create cells form"/>
        			<Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="volume">Volume(cubic meters)</Form.Label>
                                <Form.Control required type="number" id="volume1" name="volume1"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cell1">Heated count</Form.Label>
                                <Form.Control required type="number" id="cell1" name="cell1"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cellPrice1">Price of heated cells</Form.Label>
                                <Form.Control required type="number" id="cellPrice1" name="cellPrice1"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="volume">Volume(cubic meters)</Form.Label>
                                <Form.Control required type="number" id="volume2" name="volume2"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cell2">Not heated count</Form.Label>
                                <Form.Control required type="number" id="cell2" name="cell2"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cellPrice2">Price of not heated cells</Form.Label>
                                <Form.Control required type="number" id="cellPrice2" name="cellPrice2"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        	<Form.Group as={Col}>
                                <Form.Label htmlFor="volume">Volume(cubic meters)</Form.Label>
                                <Form.Control required type="number" id="volume3" name="volume3"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cell3">Freezers count</Form.Label>
                                <Form.Control required type="number" id="cell3" name="cell3"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cellPrice3">Price of freezers cells</Form.Label>
                                <Form.Control required type="number" id="cellPrice3" name="cellPrice3"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        	<Form.Group as={Col}>
                                <Form.Label htmlFor="volume">Volume(cubic meters)</Form.Label>
                                <Form.Control required type="number" id="volume4" name="volume4"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cell4">Outdoors count</Form.Label>
                                <Form.Control required type="number" id="cell4" name="cell4"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="cellPrice4">Price of outdoor cells</Form.Label>
                                <Form.Control required type="number" id="cellPrice4" name="cellPrice4"/>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
            </div>
		)
	}
}

export const setValid = (flag) => {
    return async dispatch => {
        if(flag){
            dispatch(setValidTrue());
        }
        else {
            dispatch(setValidFalse());
        }
    }
};

export const fetchCellsCreate = (cellsData, companyId) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const cells = await CellsService.addCells(cellsData, companyId);
            dispatch(setLoadingFalse());
            dispatch(receiveCellsCreateResult(cells));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    }
};

export const callInfoModal =(header, message) => {
    return async dispatch => {
        dispatch(showModal(header, message));
    }
};


const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = dispatch => {
    return {
        fetchCellsCreate: (cells, companyId) => dispatch(fetchCellsCreate(cells, companyId)),
        setValid: (flag) => dispatch(setValid(flag)),
        callInfoModal: (header, message) => dispatch(callInfoModal(header, message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCellsContainer);
