import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {logOut} from "./actions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const LogOutButton = ({dispatch})=>{
        return (
            <ButtonToolbar>
                <Link className="btn btn-outline-primary" to="/login" onClick={()=>dispatch(logOut())}>Log Out</Link>
            </ButtonToolbar>
        );
};

export default connect()(LogOutButton);
