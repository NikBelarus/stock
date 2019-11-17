import React from "react";
import {connect} from "react-redux";
import {Table, Container, Button} from "react-bootstrap";

class UserHomePage extends React.Component{
	render(){
		return(
			<Container id="userInfo">
				<h2>Personal Information</h2>
				<Table striped bordered hover size="sm">
				  <tbody>
				    <tr>
				      <td>Name</td>
				      <td>{this.props.user.firstName} {this.props.user.lastName} {this.props.user.parentName}</td>
				    </tr>
				    <tr>
				      <td>Birthday</td>
				      <td>{this.props.user.birthdate}</td>
				    </tr>
				    <tr>
				      <td>Email</td>
				      <td>{this.props.user.email}</td>
				    </tr>
				    <tr>
				      <td>Address</td>
				      <td>{this.props.user.city}, {this.props.user.street} {this.props.user.house}-{this.props.user.appartment}</td>
				    </tr>
				    <tr>
				      <td>Role</td>
				      <td>{this.props.user.role}</td>
				    </tr>
				  </tbody>
				</Table>
			</Container>
		)
	}
} 

const mapStateToProps = (state) => {
	return {
		user: state.authorisation.user
	}
};

export default connect(mapStateToProps)(UserHomePage);
