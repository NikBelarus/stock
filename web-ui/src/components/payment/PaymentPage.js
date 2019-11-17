import React from "react";
import {connect} from "react-redux";

import {FieldTitle} from "../basecomponents/content/FieldTitle";
import PaymentService from "./PaymentService";
import Button from "react-bootstrap/Button";
import {showModal} from "../info_modal/actions";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import Row from "react-bootstrap/Row";

class PaymentPageContainer extends React.Component {
    render() {
        if(this.props.modal.isShown){
            return <InfoModalContainer/>
        }
        return (
            <article>
                <FieldTitle text="Thank for using our service"/>
                <Row className="justify-content-center">
                    <Button variant="success" size="lg" onClick={this.props.pay}> Pay</Button>
                </Row>
            </article>
        )
    }
}

const pay =() => {
    return async dispatch => {

        try{
            const info = await PaymentService.pay();
            if(info.success){
                dispatch(showModal("Thanks for payment", "You paid " +info.object.sum + "$"));
            }
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = state => ({
    modal: state.modal
});

const mapDispatchToProps = dispatch =>{
    return{
        showModal: (header, message) => dispatch(showModal(header, message)),
        pay: () => dispatch(pay())
    };
};


export  default connect(mapStateToProps, mapDispatchToProps)(PaymentPageContainer);
