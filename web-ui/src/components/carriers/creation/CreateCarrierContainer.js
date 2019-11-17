import React from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CarrierService from "../CarrierService";
import Col from "react-bootstrap/Col";
import {receiveCarrierCreateResult} from "../actions";
import Loading from "../../loading/Loading";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {setValidFalse, setValidTrue} from "../../validation/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {showModal} from "../../info_modal/actions";

class CreateCarrierContainer extends React.Component{
    render(){
        const {carrier} = this.props.carrier;
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (!form.checkValidity()) {
                this.props.setValid(true);
            }
            else {
                this.props.setValid(false);
                carrier.name = e.target.elements.name.value;
                carrier.companyId = this.props.authorisation.user.companyId;
                this.props.fetchCarrierCreate(carrier);
            }
        };

        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>;
        }

        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FieldTitle text="Create a carrier"/>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="name">Carrier Name</Form.Label>
                        <Form.Control required type="text" id="name" name="name" placeholder="Enter carrier name"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter carrier name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export const setValid =(flag) => {
    return async dispatch => {
        if(flag){
            dispatch(setValidTrue());
        }
        else {
            dispatch(setValidFalse());
        }
    }
};

export const fetchCarrierCreate = (carrier) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const carrierInfo = await CarrierService.createCarrier(carrier);
            dispatch(setLoadingFalse());
            dispatch(receiveCarrierCreateResult(carrierInfo));
            dispatch(showModal('Information', 'The carrier was created successfully.'));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    }
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        fetchCarrierCreate: (carrier) => dispatch(fetchCarrierCreate(carrier)),
        setValid: (flag) => dispatch(setValid(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCarrierContainer);
