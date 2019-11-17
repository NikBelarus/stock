import React from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Loading from "../../loading/Loading";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {setValidFalse, setValidTrue} from "../../validation/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {showModal} from "../../info_modal/actions";
import DriverService from "../DriverService";
import {receiveDriverCreateResult} from "../actions";

class CreateDriverContainer extends React.Component{
    render(){
        const {driver} = this.props.drivers;
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
                driver.firstName = e.target.elements.fName.value;
                driver.lastName = e.target.elements.lName.value;
                driver.passportNo = e.target.elements.passportNo.value;
                driver.issueCountry = e.target.elements.issueCountry.value;
                driver.carrierId = this.props.carriage.carriers.selectedCarrier.id;
                this.props.fetchDriverCreate(driver);
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
                <FieldTitle text="Create a driver"/>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="fName">Driver first name</Form.Label>
                        <Form.Control required type="text" id="fName" name="fName"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="lName">Driver last name</Form.Label>
                        <Form.Control required type="text" id="lName" name="lName"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="passportNo">Passport number</Form.Label>
                        <Form.Control required type="text" id="passportNo" name="passportNo"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter passport number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="issueCountry">Issue country</Form.Label>
                        <Form.Control required type="text" id="issueCountry" name="issueCountry"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter issue country.
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

export const fetchDriverCreate = (driver) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const driverInfo = await DriverService.createDriver(driver);
            dispatch(setLoadingFalse());
            dispatch(receiveDriverCreateResult(driverInfo));
            dispatch(showModal('Information', 'The driver was created successfully.'));
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
        fetchDriverCreate: (driver) => dispatch(fetchDriverCreate(driver)),
        setValid: (flag) => dispatch(setValid(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDriverContainer);
