import BootstrapTable from "react-bootstrap-table-next";
import React from "react";

export default  class CellsTable extends React.Component{

    render(){
        const cellsInfo = this.props.page.content || [];
        const columns =[{
            dataField: 'storageCondition',
            text: 'Condition'
        },{
            dataField: 'name',
            text: 'Name'
        },{
            dataField: 'cellPrice',
            text: 'Cell price'
        },{
            dataField: 'freeVolume',
            text: 'Free cell volume'
        },{
            dataField: 'volume',
            text: 'Cell volume'
        }];
        return(
            <BootstrapTable
                keyField="name"
                columns={columns}
                data={cellsInfo}
            />
        )
    }

}