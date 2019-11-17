import {connect} from "react-redux";
import React from "react";
import InfoModalContainer from "../../info_modal/InfoModalContainer";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import UserService from "../UserService";
import {
    addToDelete,
    addToDeleteAll,
    changePage,
    deleteFromTableContent,
    receivePageInfo
} from "../../basecomponents/table/actions";
import {showModal} from "../../info_modal/actions";
import CompanyWorkersTable from "./CompanyWorkersTable";
import {setNewUserProps} from "../creation/actions";
import {setLoadingFalse, setLoadingTrue} from "../../loading/actions";
import Loading from "../../loading/Loading";
import {resetTableContent} from "../../basecomponents/actions";

class CompanyWorkersTableContainer extends React.Component {
    componentDidMount() {
        this.props.fetchUsersPage();
    }

    componentWillUnmount() {
        this.props.resetTable();
    }

    onPageChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        this.props.changePage(page, sizePerPage);
        this.props.fetchUsersPage();
    }

    onDeleteRow() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you really want to delete that data?")) {
            const selected = this.props.selected;
            selected.forEach(row => {
                const id = this.props.page.content.find(user => user.email === row.email).id;
                this.props.fetchDelete(id);
                this.props.deleteFromContent(id);
            })
        }
    }

    toUserCreationPage() {
        if (this.props.stockId < 0) {
            this.props.showModal("No stock selected", "Choose a warehouse for a new employee")
        } else {
            this.props.setNewUserProps({
                stockId: this.props.stockId,
                companyId: this.props.companyId
            });
            this.props.history.push("/user");
        }
    }

    handleOnSelect = (row, isSelect) => {
        this.props.addToDelete(row, isSelect);
    };

    handleOnSelectAll = (isSelectAll, rows) => {
        this.props.addToDeleteAll(isSelectAll, rows);
    };

    render() {
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;

        if (isShown) {
            return <InfoModalContainer/>
        }

        if (loading) {
            return <Loading/>;
        }

        return (

            <Container>
                <ButtonToolbar>
                    <Button variant="success" onClick={this.toUserCreationPage.bind(this)}>New user</Button>
                    <Button variant="danger" onClick={this.onDeleteRow.bind(this)}>Delete</Button>
                </ButtonToolbar>
                <CompanyWorkersTable onPageChange={this.onPageChange.bind(this)}
                                     onDeleteRow={this.onDeleteRow.bind(this)}
                                     onSelect={this.handleOnSelect.bind(this)}
                                     onSelectAll={this.handleOnSelectAll.bind(this)}
                                     {...this.props}/>
            </Container>

        );
    }
}


export const fetchUsersPage = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const userPageInfo = await UserService.getStockUsersPage();
            dispatch(setLoadingFalse());
            dispatch(receivePageInfo(userPageInfo));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message));
        }
    };
};

export const fetchDelete = (id) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            await UserService.deleteUser(id);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error ', e.message))
        }
    }
};

const mapStateToProps = state => {
    return {
        ...state,
        modal: state.modal,
        stockId: state.company.company.activeStockId,
        page: state.table.page,
        data: state.table.page.content,
        selected: state.table.toDelete,
        companyId: state.authorisation.user.companyId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDelete: (id) => dispatch(fetchDelete(id)),
        fetchUsersPage: () => dispatch(fetchUsersPage()),
        showModal: (header, message) => dispatch(showModal(header, message)),
        changePage: (number, size) => dispatch(changePage(number, size)),
        addToDelete: (row, isSelect) => dispatch(addToDelete(row, isSelect)),
        addToDeleteAll: (isSelect, rows) => dispatch(addToDeleteAll(isSelect, rows)),
        deleteFromContent: (id) => dispatch(deleteFromTableContent(id)),
        setNewUserProps: (userProps) => dispatch(setNewUserProps(userProps)),
        resetTable:() => dispatch(resetTableContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyWorkersTableContainer);
