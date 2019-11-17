import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export function CarrierSelect(props) {
    if (props.carrier) {
        return (
            <Form.Row>
                <Form.Label>
                    Carrier
                </Form.Label>
                <Form.Control value={props.carrier.name} readOnly/>
            </Form.Row>
        )
    } else {
        return (
            <Form.Group>
                <Form.Label>
                    Choose carrier
                </Form.Label>
                <InputGroup>
                    <Form.Control as="select" onChange={props.selectCarrier} value=" ">
                        {<option value={-1}>Choose carrier</option>}
                        {props.list.map(carrier => (
                            <option value={carrier.id}>
                                {carrier.name}
                            </option>))
                        }
                    </Form.Control>
                    <InputGroup.Append>
                        <Button onClick={props.toCarrierPage}>New</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        )
    }
}
