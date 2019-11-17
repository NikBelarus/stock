import React from "react";
import {connect} from "react-redux";
import Access from "./ParseAccess";

class MenuBlock extends React.Component{
	render(){
		return(
			<div>
				<Access user={this.props.user}/>
			</div>
		)
	}
} 

const mapStateToProps = (state) => {
	return {
		user: state.authorisation.user
	}
};

export default connect(mapStateToProps)(MenuBlock);
