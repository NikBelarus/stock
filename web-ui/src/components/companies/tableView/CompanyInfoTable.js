import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class CompanyInfoTable extends  React.Component{
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(companyId) {
        let path = '/companies/' + companyId;
        this.props.history.push(path);
    }

    render() {
        const companies = this.props.page.content || [];
        const columns = [{
            dataField: 'name',
            text: 'Company name'
        }, {
            dataField: 'ownerInfo.email',
            text: 'Owner email'
        }, {
            dataField: 'adminInfo.email',
            text: 'Admin email'
        }];
        const page = this.props.page.number;
        const sizePerPage = this.props.page.size;
        const totalSize = this.props.page.totalElements;
        const selectedCompany = this.props.selected.map(company => company.name);
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selectedCompany,
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
                keyField='name'
                columns={columns}
                data={companies}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}
