import React from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Button from "react-bootstrap/Button";
import UserService from "../UserService";
import Col from "react-bootstrap/Col";
import {receiveUserCreateResult} from "./actions";
import {setValidFalse, setValidTrue} from "../../validation/actions";
import Loading from "../../loading/Loading";
import moment from "moment";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import {showModal} from "../../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import {setAdmin, setOwner, setStep} from "../../companies/actions";

class CreateUserFormContainer extends React.Component{
    render(){
        const {user} = this.props.user;
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        let placeholders = {};
        if(typeof this.props.placeholders !== "undefined"){
            placeholders = this.props.placeholders;
        }

        const checkRole = (role) => {
            return 'STOCK_ADMIN'.localeCompare(role) === 0 || 'STOCK_DISPATCHER'.localeCompare(role) === 0 ||
                'STOCK_MANAGER'.localeCompare(role) === 0 || 'CONTROLLER'.localeCompare(role) === 0 || 'STOCK_OWNER'.localeCompare(role) === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if(e.target.elements.password.value !== e.target.elements.confirm_password.value){
                this.props.callInfoModal('Warning', 'The passwords don\'t match.');
            }
            else if(e.target.elements.appartment.value <= 0){
                this.props.callInfoModal('Warning', 'The number of apartment is invalid.');
            }
            else if(!checkRole(e.target.elements.role.value)){
                this.props.callInfoModal('Warning', 'The role is not exist.');
            }
            else if(!moment(e.target.elements.birthdate.value,'YYYY-MM-DD').isValid()){
                this.props.callInfoModal('Warning', 'The birthdate is invalid.');
            }
            else if (!form.checkValidity()) {
                this.props.setValid(true);
            }
            else {
                this.props.setValid(false);
                user.password = e.target.elements.password.value;
                user.confirmPassword = e.target.elements.confirm_password.value;
                user.firstName = e.target.elements.first_name.value;
                user.lastName = e.target.elements.last_name.value;
                user.parentName = e.target.elements.parent_name.value;
                user.email = e.target.elements.email.value;
                user.birthdate = e.target.elements.birthdate.value;
                user.city = e.target.elements.city.value;
                user.street = e.target.elements.street.value;
                user.house = e.target.elements.house.value;
                user.appartment = e.target.elements.appartment.value;
                user.salary = e.target.elements.salary.value;
                if(this.props.nextStep){
                    if(this.props.nextStep === 3){
                        user.role = 'STOCK_OWNER';
                        const newUser = JSON.parse(JSON.stringify(user));
                        this.props.setOwnerInfo(newUser);
                        resetForm(e.target.elements);
                    }
                    else {
                        user.role = 'STOCK_ADMIN';
                        this.props.setAdminInfo(user);
                    }
                }
                else{
                    user.role = e.target.elements.role.value;
                    if(typeof placeholders.id === "undefined"){
                        this.props.fetchUserCreate(user,'POST');
                    } else {
                        this.props.fetchUserCreate(user,'PUT');
                    }
                }
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
                <FieldTitle text={this.props.title || 'Create user form'}/>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control required type="email" id="email" name="email" placeholder="Email" defaultValue={placeholders.email}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control required type="password" id="password" name="password" placeholder="Password"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="confirm_password">Confirm password</Form.Label>
                        <Form.Control required type="password" id="confirm_password" name="confirm_password" placeholder="Password"/>
                        <Form.Control.Feedback type="invalid">
                            Please, repeat password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="first_name">First name</Form.Label>
                        <Form.Control required type="text" id="first_name" name="first_name" defaultValue={placeholders.firstName}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last name</Form.Label>
                        <Form.Control required type="text" id="last_name" name="last_name" defaultValue={placeholders.lastName}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="parent_name">Parent name</Form.Label>
                        <Form.Control required type="text" id="parent_name" name="parent_name" defaultValue={placeholders.parentName}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter parent name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="birthdate">Birthdate</Form.Label>
                        <Form.Control required type="date" id="birthdate" name="birthdate" placeholder="YYYY-MM-DD" defaultValue={placeholders.birthdate}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter birthdate.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="salary" style={{display: this.props.nextStep ? 'none' : 'block' }}>Salary</Form.Label>
                        <Form.Control required={!this.props.nextStep} type="number" id="salary" name="salary" defaultValue={placeholders.salary} style={{display: this.props.nextStep ? 'none' : 'block' }}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter salary.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="role" style={{display: this.props.nextStep ? 'none' : 'block' }}>Role</Form.Label>
                        <Form.Control required id="role" name="role" as="select" style={{display: this.props.nextStep ? 'none' : 'block' }}>
                            <option value="STOCK_ADMIN">stock admin</option>
                            <option value="STOCK_DISPATCHER">stock dispatcher</option>
                            <option value="STOCK_MANAGER">stock manager</option>
                            <option value="CONTROLLER">controller</option>
                            <option value="STOCK_OWNER">stock owner</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please, choose role.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control required type="text" id="city" name="city" defaultValue={placeholders.city}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="street">Street</Form.Label>
                        <Form.Control required type="text" id="street" name="street" defaultValue={placeholders.street}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter street.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="house">House</Form.Label>
                        <Form.Control required type="text" id="house" name="house" defaultValue={placeholders.house}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter house.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="appartment">Appartment</Form.Label>
                        <Form.Control required type="number" id="appartment" name="appartment" defaultValue={placeholders.appartment}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct apartment.
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

export const resetForm = (form) => {
    form.password.value = '';
    form.confirm_password.value = '';
    form.first_name.value = '';
    form.last_name.value = '';
    form.parent_name.value = '';
    form.email.value = '';
    form.birthdate.value = '';
    form.city.value = '';
    form.street.value = '';
    form.house.value = '';
    form.appartment.value = '';
    form.salary.value = null;
};

export const callInfoModal =(header, message) => {
    return async dispatch => {
        dispatch(showModal(header, message));
    }
};

export const fetchUserCreate = (userData, fetch_method) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const user = await UserService.fetchCreate(userData, fetch_method);
            dispatch(setLoadingFalse());
            dispatch(receiveUserCreateResult(user));
            if(fetch_method === "PUT"){
                dispatch(showModal('Information', 'The information is edited.'));
            } else {
                dispatch(showModal('Information', 'The user is created.'));
            }
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    }
};

export const setOwnerInfo = owner => {
    return async dispatch => {
        dispatch(setOwner(owner));
        dispatch(setStep(3));
    }
};

export const setAdminInfo = admin => {
    return async dispatch => {
        dispatch(setAdmin(admin));
        dispatch(setStep(4));
    }
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        fetchUserCreate: (user, fetch_method) => dispatch(fetchUserCreate(user, fetch_method)),
        setValid: (flag) => dispatch(setValid(flag)),
        callInfoModal: (header, message) => dispatch(callInfoModal(header, message)),
        setOwnerInfo: (owner) => dispatch(setOwnerInfo(owner)),
        setAdminInfo: (admin) => dispatch(setAdminInfo(admin))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserFormContainer);
