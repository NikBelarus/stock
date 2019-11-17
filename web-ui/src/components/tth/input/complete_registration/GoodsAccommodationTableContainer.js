import React from "react";
import {connect} from "react-redux";
import {GoodsAccommodationTable} from "./GoodsAccommodationTable";
import {chooseCellGood, setAccommodationComplete} from "./actions";

class GoodsAccommodationTableContainer extends React.Component {

    onSetCell = (oldValue, newValue, row) => {
        this.props.chooseCellForGood(oldValue, newValue, row);
        if(this.checkFilling()){
            this.props.setAccommodationComplete(true);
        }
    };

    render() {
        let data = this.props.goods;
        const cells = this.props.cells;
        data.forEach(good => {
            let cellName ="";
            cells.forEach(cell => {
                if (cell.id === good.cellId) {
                    cellName = cell.name
                }
                cell.storageCondition = cell.storageCondition.toLowerCase().replace("_"," ");
            });
            good.cellName = cellName;
        });
        return (
            <GoodsAccommodationTable
                onSetCell={this.onSetCell}
                cells={this.props.cells}
                data={data}
            />
        )
    }

    checkFilling() {
        const goods = this.props.goods;
        for(let i in goods){
            if(!goods[i].cellId){
                return false;
            }
        }
        return true;
    }
}

const mapStateToProps = state => {
    return {
        cells: state.accommodation.cells,
        goods: state.accommodation.goods
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chooseCellForGood: (oldValue, newValue, row) => dispatch(chooseCellGood(oldValue, newValue, row)),
        setAccommodationComplete: (accommodationComplete) => dispatch(setAccommodationComplete(accommodationComplete))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsAccommodationTableContainer);
