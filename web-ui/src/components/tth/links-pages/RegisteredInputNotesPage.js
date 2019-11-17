import {connect} from "react-redux";
import React from "react";
import TthService from "../TthService";
import {REGISTERED} from "../tthStatuses";
import {INPUT} from "../tthTypes";
import {receiveInputRegisteredTthList} from "./actions";
import {showModal} from "../../info_modal/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";

class RegisteredInputNotesPage extends React.Component {
    componentDidMount() {
        this.props.fetchRegisteredInputNotes();
    }

    render() {
        const notes = this.props.tth;
        if (notes.length === 0) {
            return (
                <Container>
                    <FieldTitle text="Active verified output consignments"/>
                    <Row className="justify-content-md-center">
                        <p>There is no registered consignment now</p>
                    </Row>
                </Container>
            )
        }
        return (
            <Container>
                <FieldTitle text="Active registered consignments"/>
                <ListGroup>
                    {notes.map(note => {
                        return (
                            <ListGroup.Item>
                                <Link to={"/registered__input_consignments/" + note.id}>
                                    Registered {moment(note.date,  moment.ISO_8601).toString()}
                                </Link>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }
}

const fetchRegisteredInputNotes = () => {
    return async dispatch => {
        try {
            const notes = await TthService.fetchActiveNotes(REGISTERED, INPUT);
            dispatch(receiveInputRegisteredTthList(notes.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        tth: state.notes.registeredInputTthList,
        modal: state.modal,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRegisteredInputNotes: () => dispatch(fetchRegisteredInputNotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredInputNotesPage);
