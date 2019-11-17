import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export function DriverSelect(props) {
    if (props.driver) {
        return (
            <Form.Row>
                <Form.Label>
                    Driver
                </Form.Label>
                <Form.Control required value={props.driver.lastName} disabled/>
            </Form.Row>
        )
    } else {
        return (
            <Form.Group>
                <Form.Label>
                    Choose driver
                </Form.Label>
                <InputGroup>
                    <Form.Control as="select" onChange={props.selectDriver} value=" ">
                        {<option value={-1}>Choose driver</option>}
                        {props.list.map(driver => (
                            <option value={driver.id}>
                                {driver.passportNo + ' ' + driver.lastName}
                            </option>))
                        }
                    </Form.Control>
                    <InputGroup.Append>
                        <Button onClick={props.toDriverPage}>New</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        )
    }
}
