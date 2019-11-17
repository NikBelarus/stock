import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import AppNavBar from "./components/basecomponents/navbar/AppNavBar";
import Footer from "./components/basecomponents/Footer";
import Content from "./components/basecomponents/content/Content";
import {store} from "./store";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Menu from "./components/nav-menu/MenuBlock";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div id="outer-container">
                <AppNavBar/>
                <Container id="main-area">
                    <Row id="main-area-row">
                        <Col xs={3}>
                            <Container id="menu">
                                <Menu/>
                            </Container>
                        </Col>
                        <Col xs={9}>
                            <Container id="content">
                                <Content/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
);

export default App;


