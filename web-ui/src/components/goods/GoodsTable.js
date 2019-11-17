import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export class GoodsTable extends React.Component {
    render() {
        const data = this.props.data;
        const style = {
            fontSize: '14px'
        };
        const columns = [
            {
                dataField: "id",
                text: "id",
                hidden: true
            }, {
                dataField: "name",
                text: "name",
                style: style
            }, {
                dataField: "weight",
                text: "weight",
                style: style
            },{
                dataField: "unit",
                text: "unit",
                style: style
            },{
                dataField: "volume",
                text: "volume",
                style: style
            },{
                dataField: "count",
                text: "count",
                style: style
            },{
                dataField: "price",
                text:"price",
                style:style
            }
        ];
        return (
            <BootstrapTable
                keyField='id'
                data={data}
                columns={columns}
                />
        )
    }
}
