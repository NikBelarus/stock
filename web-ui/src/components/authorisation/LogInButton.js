import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";

class LogInButton extends React.Component {
	render() {
		return (
			<ButtonToolbar>
                <Link className="btn btn-primary" to="/login">Log in</Link>
			</ButtonToolbar>
		);
	}
}

export default LogInButton;
