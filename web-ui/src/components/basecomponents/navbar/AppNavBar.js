import React, {Component} from "react"
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import MenuLogo from "../../nav-menu/img/menu-open.svg";
import AuthorisationButtonContainer from "../../authorisation/AuthorisationButtonContainer";
import Menu from "../../nav-menu/menu";

export default class AppNavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" id="navbar">
                <Container>
                    <img
                        alt="menuLogo"
                        src={ MenuLogo }
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        onClick={ Menu }
                        id="menu-button"
                    />
                    <Navbar.Brand className="align-center">
                        Stock managing system
                    </Navbar.Brand>
                    <ButtonToolbar justify="right">
                        <AuthorisationButtonContainer/>
                    </ButtonToolbar>
                </Container>
            </Navbar>
        )
    }
}
