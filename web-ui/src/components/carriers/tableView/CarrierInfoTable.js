import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class CarrierInfoTable extends  React.Component{
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(carrierId) {
        let path = '/carriers/' + carrierId;
        this.props.history.push(path);
    }

    render() {
        const carriers = this.props.page.content || [];
        const columns = [{
            dataField: 'name',
            text: 'Carrier name'
        }];
        const page = this.props.page.number;
        const sizePerPage = this.props.page.size;
        const totalSize = this.props.page.totalElements;
        const selectedCarrier = this.props.selected.map(carrier => carrier.name);
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selectedCarrier,
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
                data={carriers}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}
