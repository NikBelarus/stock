import Form from "react-bootstrap/Form";
import React from "react"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {FREEZER, HEATED, NOT_HEATED, OUTDOOR} from "../stocks/cells/storageConditions";
import Button from "react-bootstrap/Button";
import {addGoodToTth} from "../tth/actions";
import {connect} from "react-redux";
import {REGISTERED} from "./GoodsStatuses";
import {showModal} from "../info_modal/actions";

class GoodCreateFormContainer extends React.Component {

    render() {
        const carrier = this.props.carrier;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = document.getElementById("good_create_form");
            let good = {};

            if (form.checkValidity()) {
                const elements = form.elements;
                good.name = elements.name.value;
                good.weight = elements.weight.value;
                good.volume = elements.volume.value;
                good.unit = elements.unit.value;
                good.count = elements.count.value;
                good.storageCondition = elements.storage_condition.value;
                good.price = elements.price.value;
                good.carrierId = carrier.id;
                good.state = REGISTERED;
                this.props.addGood(good);
                form.reset();
            } else {
                this.props.showModal("Incorrect data", "good's data are incorrect")
            }
        };
        return (
            <Form noValidate id="good_create_form">
                <h3>Add good</h3>
                <Form.Group as={Row} controlId="goodNamePlaintext">
                    <Form.Label column sm="4">
                        Name
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="text" name="name" id="name" placeholder="Name"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct name.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}  controlId="goodWeightPlaintext">
                    <Form.Label column sm="4">
                        Weight
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="number" id="weight" name="weight" min={0.1} step={0.1}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct weight.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="goodVolumePlaintext">
                    <Form.Label column sm="4">
                        Volume
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="number" id="volume" name="volume" min={0.1} step={0.1}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct volume.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="goodUnitPlaintext">
                    <Form.Label column sm="4">
                        Unit
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="text" id="unit" name="unit"/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct unit.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="goodCountPlaintext">
                    <Form.Label column sm="4">
                        Count
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="number" id="count" name="count" min={1} step={0.1}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct count.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="goodPricePlaintext">
                    <Form.Label column sm="4">
                        Price for unit
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="number" id="price" name="price" min={0.1} step={0.1}/>
                        <Form.Control.Feedback type="invalid">
                            Please, enter correct unit.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="goodStorageConditionPlaintext">
                    <Form.Label column sm="4">
                        Storage condition
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control as="select" id="storage_condition" name="storage_condition">
                            <option value={HEATED}>Heated</option>
                            <option value={NOT_HEATED}>Not heated</option>
                            <option value={FREEZER}>Freezer</option>
                            <option value={OUTDOOR}>Outdoor</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please, choose storage condition.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Add good
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authorisation.user,
    carrier: state.carriage.carriers.selectedCarrier
});

const mapDispatchToProps = dispatch => {
    return {
        addGood: (good) => dispatch(addGoodToTth(good)),
        showModal:(header, msg)=> dispatch(showModal(header, msg))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodCreateFormContainer);
