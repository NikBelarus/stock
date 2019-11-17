import {connect} from "react-redux";
import React from "react";
import TthService from "../TthService";
import {VERIFICATION_COMPLETED} from "../tthStatuses";
import {OUTPUT} from "../tthTypes";
import {receiveOutputVerifiedList} from "./actions";
import {showModal} from "../../info_modal/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import moment from "moment";

class VerifiedOutputNotesPage extends React.Component {
    componentDidMount() {
        this.props.fetchVerifiedOutputNotes();
    }

    render() {
        const notes = this.props.tth;
        if (notes.length === 0) {
            return (
                <Container>
                    <FieldTitle text="Active verified output consignments"/>
                    <Row className="justify-content-md-center">
                        <p>There is no verified consignment now</p>
                    </Row>
                </Container>
            )
        }
        return (
            <Container>
                <FieldTitle text="Active verified output consignments"/>
                <ListGroup>
                    {notes.map(note => {
                        return (
                            <ListGroup.Item>
                                <Link to={"/verified__output_consignments/" + note.id}>
                                    Verified {moment(note.date, moment.ISO_8601).toString()}
                                </Link>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }
}

const fetchVerifiedOutputNotes = () => {
    return async dispatch => {
        try {
            const notes = await TthService.fetchActiveNotes(VERIFICATION_COMPLETED, OUTPUT);
            dispatch(receiveOutputVerifiedList(notes.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        tth: state.notes.verifiedOutputTthList,
        modal: state.modal,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVerifiedOutputNotes: () => dispatch(fetchVerifiedOutputNotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedOutputNotesPage);
