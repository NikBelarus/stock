import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";

export default class CancellationInfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(actId) {
        let path = '/cancellations/' + actId;
        this.props.handleRedirect(actId);
        this.props.history.push(path);
    }

    render() {
        const cancellationActs = this.props.page.content || [];
        if (cancellationActs[0]  && cancellationActs[0].stock ) {
            cancellationActs.forEach(act => act.stock = act.stock.city + ', ' + act.stock.street + ', ' + act.stock.house);
            cancellationActs.forEach(act => act.responsibleWorker = act.responsibleWorker.firstName + ' ' + act.responsibleWorker.lastName);
            cancellationActs.forEach(act => act.date = act.date.substring(0, 10) + ' ' + act.date.substring(11, act.date.length));
            cancellationActs.forEach(act => act.goods = act.goods.map(function (item) {
                return item.name + ', '
            }));
        }
        const columns = [{
            dataField: 'stock',
            text: 'Stock address'
        }, {
            dataField: 'responsibleWorker',
            text: 'Responsible worker'
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
                data={cancellationActs}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}
