import React from "react";
import {connect} from "react-redux";

import LoginService from "./LoginService";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {setValidFalse, setValidTrue} from "../validation/actions";
import {showModal} from "../info_modal/actions";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import Loading from "../loading/Loading";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";
import {logIn} from "./actions";
import {Redirect} from "react-router-dom";

class AuthorisationContainer extends React.Component {
    render() {
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        const isAuthorised = this.props.authorisation.authorized;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (!form.checkValidity()) {
                this.props.setValid(true);
            } else {
                this.props.setValid(false);
                const {login} = this.props.authorisation;
                login.email = e.target.elements.email.value;
                login.password = e.target.elements.password.value;
                this.props.fetchLoginForm(login);
            }
        };

        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>
        }

        if (isAuthorised) {
            return <Redirect to="/home"/>;
        }
        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FieldTitle text="Login form"/>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control required type="email" id="email" name="email" placeholder="Enter email"/>

                    <Form.Control.Feedback type="invalid">
                        Please, enter email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control required type="password" id="password" name="password" placeholder="Password"/>
                    <Form.Control.Feedback type="invalid">
                        Please, enter password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export const setValid = (flag) => {
    return async dispatch => {
        if (flag) {
            dispatch(setValidTrue());
        } else {
            dispatch(setValidFalse());
        }
    }
};

export const fetchLoginForm = (login) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const userInfo = await LoginService.fetchLogin(login);
            if(!userInfo.accessToken){
                dispatch(showModal('Authorization failed', userInfo.message));
                dispatch(setLoadingFalse());
                return;
            }
            dispatch(setLoadingFalse());
            if(userInfo.message){
                dispatch(showModal("Message", userInfo.message))
            }
            dispatch(logIn(userInfo));
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
        fetchLoginForm: (login) => dispatch(fetchLoginForm(login)),
        setValid: (flag) => dispatch(setValid(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorisationContainer);
