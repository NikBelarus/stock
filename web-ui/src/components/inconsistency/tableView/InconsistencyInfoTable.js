import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class InconsistencyInfoTable extends React.Component{

    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(actId){
        let path = '/inconsistencies/' + actId;
        this.props.handleRedirect(actId);
        this.props.history.push(path);
    }

    render() {
        const inconsistencyActs = this.props.page.content || [];
        if (inconsistencyActs[0] && inconsistencyActs[0].driver) {
             inconsistencyActs.forEach(act => act.driver = act.driver.firstName + ' ' + act.driver.lastName);
            inconsistencyActs.forEach(act => act.stockWorker = act.user.firstName + ' ' + act.user.lastName);
            inconsistencyActs.forEach(act => act.date = act.date.substring(0, 10) + ' ' + act.date.substring(11, act.date.length));
            inconsistencyActs.forEach(act => act.goods = act.goods.map(function (item) {
                return item.name + ', '
            }));
        }
        const columns = [{
            dataField: 'driver',
            text: 'Driver'
        }, {
            dataField: 'stockWorker',
            text: 'Stock worker'
        }, {
            dataField: 'date',
            text: 'Date'
        }, {
            dataField: 'goods',
            text: 'Goods'
        }];
        const page = this.props.page.number;
        const sizePerPage = this.props.page.size;
        const totalSize = this.props.page.totalElements;
        const rowEvents = {
            onClick: (e, row) => {
                this.routeChange(row.id);
            }
        };
        return (
            <BootstrapTable
                rowEvents={rowEvents}
                remote
                keyField='id'
                columns={columns}
                data={inconsistencyActs}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}
