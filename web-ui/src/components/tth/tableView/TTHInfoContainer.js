import React from "react";
import {connect} from "react-redux";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import {showModal} from "../../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import TthService from "../TthService";
import {changeConsTypeForInfoTable} from "../actions";
import TTHInfoTableContainer from "./TTHInfoTableContainer";
import {receivePageInfo} from "../../basecomponents/table/actions";

class TTHInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.changeCurrentConsignmentsType.bind(this);
    }

    componentDidMount() {
        this.props.fetchTTHPage();
    }

    changeCurrentConsignmentsType = (e) => {
        let consType = e.target.value;
        if(consType === "no"){
            consType = null;
        }
        console.log(this.props);
        this.props.changeCurrentConsignmentsType(consType);
        this.props.fetchTTHPage();
    };

    render() {
        return (
            <article>
                <FieldTitle text="Consignments of company"/>
                <Container>
                    <Container>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary" id="consignmentDropdown">
                                Consignment type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button" value="no" onClick={this.changeCurrentConsignmentsType}>Все</Dropdown.Item>
                                <Dropdown.Item as="button" value="INPUT" onClick={this.changeCurrentConsignmentsType}>Входящие</Dropdown.Item>
                                <Dropdown.Item as="button" value="OUTPUT" onClick={this.changeCurrentConsignmentsType}>Исходящие</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <p/>
                    <TTHInfoTableContainer
                        {...this.props}
                    />
                </Container>
            </article>
        )
    }
}

export const fetchTTHPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const response = await TthService.fetchGetAllConsignmentsForCompany();
            dispatch(receivePageInfo(response));
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal("Error ", e.message));
        }
    };
};

export const changeCurrentConsignmentsType = (consType) => {
    return async dispatch => {
        dispatch(changeConsTypeForInfoTable(consType));
    };
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeCurrentConsignmentsType: (consType) => dispatch(changeCurrentConsignmentsType(consType)),
        fetchTTHPage: () => dispatch(fetchTTHPage())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TTHInfoContainer);
