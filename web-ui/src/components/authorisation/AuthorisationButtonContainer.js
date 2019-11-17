import React from "react";
import {connect} from "react-redux";

import LogOutButton from "./LogOutButton";
import LogInButton from "./LogInButton";

class AuthorisationButtonContainer extends React.Component{
	render(){
		if(this.props.isAuthorised){
			return <LogOutButton/>
		} else{
			return <LogInButton/>;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthorised: state.authorisation.authorized
	}
};

export default connect(mapStateToProps)(AuthorisationButtonContainer);
