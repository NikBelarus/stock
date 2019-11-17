import Spinner from "react-bootstrap/Spinner";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Loading = () => {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Spinner animation="border" variant="primary"/>
            </Col>
        </Row>
    );
};

export default Loading;
