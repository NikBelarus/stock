import {connect} from "react-redux";
import React from "react";
import TthService from "../TthService";
import {VERIFICATION_COMPLETED} from "../tthStatuses";
import {INPUT} from "../tthTypes";
import {receiveInputVerifiedList} from "./actions";
import {showModal} from "../../info_modal/actions";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import moment from "moment";

class VerifiedInputNotesPage extends React.Component {
    componentDidMount() {
        this.props.fetchVerifiedInputNotes();
    }

    render() {
        const notes = this.props.tth;
        if (notes.length === 0) {
            return (
                <Container>
                    <FieldTitle text="Active verified input consignments"/>
                    <Row className="justify-content-md-center">
                        <p>There is no consignment for accommodation now</p>
                    </Row>
                </Container>
            )
        }
        return (
            <Container>
                <FieldTitle text="Active verified input consignments"/>
                <ListGroup>
                    {notes.map(note => {
                        return (
                            <ListGroup.Item>
                                <Link to={"/verified__input_consignments/" + note.id}>
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

const fetchVerifiedInputNotes = () => {
    return async dispatch => {
        try {
            const notes = await TthService.fetchActiveNotes(VERIFICATION_COMPLETED, INPUT);
            dispatch(receiveInputVerifiedList(notes.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        tth: state.notes.verifiedInputTthList,
        modal: state.modal,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVerifiedInputNotes: () => dispatch(fetchVerifiedInputNotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedInputNotesPage);
