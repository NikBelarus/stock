import React from "react";
import {connect} from "react-redux";
import Modal from "react-bootstrap/Modal";
import {hideModal, showModal} from "./actions";

class InfoModalContainer extends React.Component{
    render() {
        const {isShown, header, message} = this.props.modal;
        return (
            <Modal show={isShown}
                   onHide={() => this.props.setModalShow(false)}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
            </Modal>
        );
    }
}

export const setModalShow = (flag) => {
    return async dispatch => {
        if(flag){
            dispatch(showModal());
        }
        else {
            dispatch(hideModal());
        }
    };
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        setModalShow: (flag) => dispatch(setModalShow(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModalContainer);
