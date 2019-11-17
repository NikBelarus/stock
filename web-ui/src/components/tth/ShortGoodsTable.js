import React from "react";
import BootstrapTable from "react-bootstrap-table-next";


export class ShortGoodsTable extends React.Component {
    columns = [{
        dataField: 'id',
        text: ' id',
        hidden: true
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'price',
        text:
            'Price'
    }, {
        dataField: 'storageCondition',
        text:
            'Storage condition'
    }];

    render() {
        const goods = this.props.goods;
        let goodsList = goods.map(good => {
            let updGood = {
                ...good,
                id: goods.indexOf(good)
            };
            updGood.storageCondition = good.storageCondition.toLowerCase().replace("_"," ");
            return updGood;
            });
        return (
            <BootstrapTable keyField='id'columns={this.columns} data={goodsList} />
        )
    }
}

