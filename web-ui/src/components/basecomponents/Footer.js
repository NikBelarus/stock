import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default class Footer extends React.Component {
	render() {
		return (
			<Navbar fixed="bottom" bg="dark" variant="white">
				Team 2. Stock managing system. 2019
			</Navbar>
		);
	}
}