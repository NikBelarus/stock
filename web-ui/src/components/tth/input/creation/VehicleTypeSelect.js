import React from "react"
import Form from "react-bootstrap/Form";
import {RAILWAY, TRUCK} from "../../../carriage/vehicleTypes";

export function VehicleTypeSelect(props) {
    if (!props.vehicleType) {
        return (
            <Form.Group name="vehicleType" id ="vehicleType">
                <Form.Label>
                    Choose vehicle type
                </Form.Label>
                <Form.Control as="select" onChange ={props.selectVehicleType}>
                    <option value = {-1} >Choose vehicle type</option>
                    <option value={TRUCK} >Truck</option>
                    <option value={RAILWAY} >Railway</option>
                </Form.Control>
            </Form.Group>
        )
    } else{
        return (
            <Form.Row>
                <Form.Label>
                    Vehicle type
                </Form.Label>
                <Form.Control value={props.vehicleType.toLowerCase()} readOnly/>
            </Form.Row>
        )
    }
}
