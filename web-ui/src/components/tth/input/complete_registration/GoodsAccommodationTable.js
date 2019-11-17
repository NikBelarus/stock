import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';


export class GoodsAccommodationTable extends React.Component {
    render(){
        const cells = this.props.cells;
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
                dataField: "volume",
                text: "volume",
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
            },
            {
                dataField: "storageCondition",
                text: "condition",
                editable: false,
                style: {
                    fontSize: '14px',
                    width: "20%"
                }
            },
            {
                dataField: "cellName",
                text: "cell name",
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, {row, column}) => {
                        const goodCondition = row.storageCondition;
                        let goodCells = cells.filter(cell =>
                            cell.storageCondition.toUpperCase().replace(" ", "_") ===
                            goodCondition.toUpperCase().replace(" ", "_")
                            && cell.freeVolume >= row.volume * row.count);
                        let options = goodCells.map(cell =>{
                            return{
                                value: cell.id,
                                label: cell.name
                            }
                        });
                        return options;
                    }
                }
            }
        ];

        return (
            <BootstrapTable
                keyField='id'
                data={this.props.data}
                columns ={columns}
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    afterSaveCell: (oldValue, newValue, row, column) =>
                        this.props.onSetCell(oldValue, newValue, row, column),

                })}
                />
        )
    }
}
