import BootstrapTable from "react-bootstrap-table-next";
import React from "react";

export default  class StocksTable extends React.Component{

    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(stockId){
        let path = '/stocks/'+stockId;
        this.props.handleRedirect(stockId);
        this.props.history.push(path);
    }
    render(){
        const stocksInfo = this.props.page.content || [];
        stocksInfo.forEach(stock => stock.address = stock.city + ' ' + stock.street + ' ' + stock.house );
        const columns =[{
            dataField: 'address',
            text: 'Address'
        },{
            dataField: 'workersCount',
            text: 'Workers count'
        },{
            dataField: 'cellsCount',
            text: 'Cells count'
        }, {
            dataField: 'freeCellsCount',
            text: 'Free cells count'
        }];
        const selectedStock = this.props.selected.map(stock => stock.address);
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selectedStock,
            onSelect: this.props.onSelect,
            onSelectAll: this.props.onSelectAll
        };
        const rowEvents = {
            onDoubleClick: (e, row, rowIndex) => {
                this.routeChange(row.id);
            }
        };
        return(
            <BootstrapTable
                selectRow={selectRow}
                rowEvents={rowEvents}
                remot
                keyField="address"
                columns={columns}
                data={stocksInfo}
            />
        )
    }

}
