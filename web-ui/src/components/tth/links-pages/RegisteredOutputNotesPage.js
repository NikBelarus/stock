import {connect} from "react-redux";
import React from "react";
import TthService from "../TthService";
import {REGISTERED} from "../tthStatuses";
import {OUTPUT} from "../tthTypes";
import {receiveOutputRegisteredTthList} from "./actions";
import {showModal} from "../../info_modal/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import moment from "moment";

class RegisteredOutputNotesPage extends React.Component {
    componentDidMount() {
        this.props.fetchRegisteredOutputNotes();
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
                <FieldTitle text="Active registered output consignments"/>
                <ListGroup>
                    {notes.map(note => {
                        return (
                            <ListGroup.Item>
                                <Link to={"/registered__output_consignments/" + note.id}>
                                    Registered {moment(note.date, moment.ISO_8601).toString()}
                                </Link>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }
}

const fetchRegisteredOutputNotes = () => {
    return async dispatch => {
        try {
            const notes = await TthService.fetchActiveNotes(REGISTERED, OUTPUT);
            dispatch(receiveOutputRegisteredTthList(notes.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        tth: state.notes.registeredOutputTthList,
        modal: state.modal,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRegisteredOutputNotes: () => dispatch(fetchRegisteredOutputNotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredOutputNotesPage);
