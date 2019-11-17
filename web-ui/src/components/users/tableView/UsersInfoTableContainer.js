import {connect} from "react-redux";
import React from "react";
import UserService from "../UserService";
import {showModal} from "../../info_modal/actions";
import {
    addToDelete,
    addToDeleteAll,
    changePage,
    deleteFromTableContent,
    receivePageInfo
} from "../../basecomponents/table/actions";
import UsersInfoTable from "./UsersInfoTable";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import Container from "react-bootstrap/Container";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class UsersInfoTableContainer extends React.Component {

    componentDidMount() {
        this.props.resetTable();
        this.props.fetchUsersPage();
    }

    onPageChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        this.props.changePage(page, sizePerPage);
        this.props.fetchUsersPage();
    }

    onDeleteRow() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Do you really want to delete that data?")){
            const selected = this.props.selected;
            selected.forEach( row => {
                const id = this.props.page.content.find(user => user.email === row.email).id;
                this.props.fetchDelete(id);
                this.props.deleteFromContent(id);
            })
        }
    }

    handleOnSelect = (row, isSelect) => {
        this.props.addToDelete(row, isSelect);
    };

    handleOnSelectAll =(isSelectAll, rows)=>{
        this.props.addToDeleteAll(isSelectAll, rows);
    };

    render() {
        const {isShown} = this.props.modal;
        if (isShown) {
            return <InfoModalContainer/>
        }
        return (
            <article>
                <FieldTitle text="Users info"/>
                <Container>
                    <ButtonToolbar>
                        <Link className="btn btn-success" to="/user">New user</Link>
                        <Button variant="danger" onClick={this.onDeleteRow.bind(this)}>Delete</Button>
                    </ButtonToolbar>
                    <UsersInfoTable onPageChange={this.onPageChange.bind(this)}
                                    onDeleteRow={this.onDeleteRow.bind(this)}
                                    onSelect={this.handleOnSelect.bind(this)}
                                    onSelectAll={this.handleOnSelectAll.bind(this)}
                                    {...this.props}/>
                </Container>
            </article>
        );
    }
}


export const fetchUsersPage = () => {
    return async dispatch => {
        try {
            const userPageInfo = await UserService.getUsersPage();
            dispatch(receivePageInfo(userPageInfo));
        } catch (e) {
            dispatch(showModal('Error ', e.message));
        }
    };
};

export const fetchDelete = (id) => {
    return async dispatch => {
        try {
            await UserService.deleteUser(id);
        } catch (e) {
            dispatch(showModal('Error ', e.message))
        }
    }
};

const mapStateToProps = state => {
    return {
        modal: state.modal,
        page: state.table.page,
        data: state.table.page.content,
        selected: state.table.toDelete
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDelete: (id) => dispatch(fetchDelete(id)),
        fetchUsersPage: () => dispatch(fetchUsersPage()),
        changePage: (number, size) => dispatch(changePage(number, size)),
        addToDelete: (row, isSelect) => dispatch(addToDelete(row, isSelect)),
        addToDeleteAll: (isSelect, rows) => dispatch(addToDeleteAll(isSelect, rows)),
        deleteFromContent: (id) => dispatch(deleteFromTableContent(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersInfoTableContainer);
