import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export class  FieldTitle extends React.Component{
	render() {
		return (
		<h2 className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
			{this.props.text}
		</h2>
		);
	}
}