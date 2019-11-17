import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class UsersInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(userId) {
        let path = '/users/' + userId;
        this.props.history.push(path);
    }

    render() {
        const users = this.props.page.content || [];
        users.forEach(user => user.fullName = user.firstName + ' ' + user.lastName + ' ' + user.parentName);
        const columns = [{
            dataField: 'fullName',
            text: 'Full name'
        }, {
            dataField: 'email',
            text: 'Email'
        }, {
            dataField: 'role',
            text: 'Role'
        }];
        const page = this.props.page.number;
        const sizePerPage = this.props.page.size;
        const totalSize = this.props.page.totalElements;
        const selectedEmail = this.props.selected.map(user => user.email);
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selectedEmail,
            onSelect: this.props.onSelect,
            onSelectAll: this.props.onSelectAll
        };
        const rowEvents = {
            onDoubleClick: (e, row, rowIndex) => {
                this.routeChange(row.id);
            }
        };
        return (

            <BootstrapTable
                selectRow={selectRow}
                rowEvents={rowEvents}
                remote
                keyField='email'
                columns={columns}
                data={users}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}
