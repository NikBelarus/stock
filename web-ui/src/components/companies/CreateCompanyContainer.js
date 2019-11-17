import React from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import Button from "react-bootstrap/Button";
import CompanyService from "./CompanyService";
import Col from "react-bootstrap/Col";
import {receiveCompanyCreateResult, resetCompanyContent, setStep} from "./actions";
import {setValidFalse, setValidTrue} from "../validation/actions";
import Loading from "../loading/Loading";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import CreateUserContainer from "../users/creation/CreateUserFormContainer";
import {showModal} from "../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";

class CreateCompanyContainer extends React.Component {
    componentWillUnmount() {
        this.props.resetCompanyContent();
    }

    render() {
        const {company} = this.props.company;
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        const {step} = this.props.company;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (!form.checkValidity()) {
                this.props.setValid(true);
            } else {
                this.props.setValid(false);
                company.name = e.target.elements.name.value;
                this.props.nextStep(2);
            }
        };

        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>;
        }

        if (step === 1) {
            return (
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FieldTitle text="Step 1. Create a company"/>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="name">Company Name</Form.Label>
                            <Form.Control required type="text" id="name" name="name" placeholder="Enter company name"/>
                            <Form.Control.Feedback type="invalid">
                                Please, enter company name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            );
        }

        if (step === 2) {
            return <CreateUserContainer nextStep={3} title='Step 2. Create a company owner'/>
        }

        if (step === 3) {
            return <CreateUserContainer nextStep={4} title='Step 3. Create a company admin'/>
        }

        if (step === 4) {
            this.props.nextStep(1);
            this.props.fetchCompanyCreate({
                company: company,
                admin: this.props.company.admin,
                owner: this.props.company.owner
            });
            return null;
        }
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

export const nextStep = (step) => {
    return async dispatch => {
        dispatch(setStep(step));
    }
};

export const fetchCompanyCreate = (companyDTO) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const company = await CompanyService.addCompany(companyDTO);
            dispatch(setLoadingFalse());
            dispatch(receiveCompanyCreateResult(company));
            dispatch(showModal('Information', 'The company with owner and admin were created successfully.'));
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
        fetchCompanyCreate: (companyDTO) => dispatch(fetchCompanyCreate(companyDTO)),
        nextStep: (step) => dispatch(nextStep(step)),
        setValid: (flag) => dispatch(setValid(flag)),
        resetCompanyContent: () => dispatch(resetCompanyContent())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyContainer);
