import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class CheckingGoodsCountTable extends React.Component {
    render() {
        //можно ли вводить значения больше указанного количества
        const onlyFever = this.props.onlyFever;
        const columns = [
            {
                dataField: "id",
                text: "id",
                editable: false,
                hidden: true,
            }, {
                dataField: "name",
                text: "name",
                editable: false,
                style: {
                    fontWeight: 'bold',
                    fontSize: '14px'
                }
            }, {
                dataField: "weight",
                text: "weight",
                editable: false,
                style: {
                    fontSize: '14px',
                    width: "10%"
                }
            }, {
                dataField: "unit",
                text: "unit",
                editable: false,
                style: {
                    fontSize: '14px',
                    width: "10%"
                }
            }, {
                dataField: "price",
                text: "price",
                editable: false,
                style: {
                    fontSize: '14px',
                    width: "20%"
                }
            }, {
                dataField: "count",
                text: "count",
                editable: false,
                style: {
                    fontSize: '14px',
                    width: "10%"
                }
            }, {
                dataField: "realCount",
                text: "enter count",
                editable: this.props.editable,
                style: {
                    fontSize: '14px',
                    width: "10%"
                },
                validator: (newValue, row, column) => {
                    if (isNaN(newValue)) {
                        return {
                            valid: false,
                            message: 'Count should be numeric'
                        };
                    }
                    if (newValue < 0) {
                        return {
                            valid: false,
                            message: 'Count should be positive'
                        };
                    }
                    if(newValue > row.count && onlyFever ){
                        return {
                            valid: false,
                            message:"Impossible"
                        }
                    }
                    return true;
                }
            }];


        return (
            <BootstrapTable
                keyField='id'
                data={this.props.data}
                columns={columns}
                cellEdit={cellEditFactory({
                    mode: 'click',
                    afterSaveCell: (oldValue, newValue, row, column) => {
                        this.props.onSetCount(oldValue, newValue, row, column)
                    }
                })}
            />
        )
    }
}


