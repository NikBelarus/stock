import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {connect} from "react-redux";
import {setSelectedTTH} from "../actions";

class TTHInfoTable extends React.Component {
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange(tthId) {
        let path = '/consignments/' + tthId;
        this.props.setTTH(this.props.page.content.filter(tth => tth.id === tthId));
        this.props.history.push(path);
    }
    render(){
        const tths = this.props.page.content || [];
        tths.forEach(tth => {
            if(tth.type ) {
                tth.type = tth.type.toLowerCase().replace("_", " ");
                tth.status = tth.status.toLowerCase().replace("_", " ");
            }
        });
        const columns = [{
            dataField: 'numberInCompany',
            text: 'Number'
        }, {
            dataField: 'type',
            text: 'Type'
        }, {
            dataField: 'status',
            text: 'Status'
        }];

        const page = this.props.page.number;
        const sizePerPage = this.props.page.size;
        const totalSize = this.props.page.totalElements;

        const rowEvents = {
            onDoubleClick: (e, row) => {
                this.routeChange(row.id);
            }
        };

        return (
            <BootstrapTable
                rowEvents={rowEvents}
                remote
                keyField='numberInCompany'
                columns={columns}
                data={tths}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.props.onPageChange}
            />
        )
    }
}

export const setTTH =(tth) => {
    return async dispatch => {
        dispatch(setSelectedTTH(tth));
    }
};

const mapStateToProps =(state) =>{
    return{
        ...state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTTH: (tth) => dispatch(setTTH(tth))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TTHInfoTable);
