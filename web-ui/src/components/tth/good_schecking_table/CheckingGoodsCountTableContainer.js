import React from "react";
import CheckingGoodsCountTable from "./CheckingGoodsCountTable";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";
import {resetCheckingTable, setGoodRealCount, setVerificationStatus} from "./actions";
import {DATA_FILLED, DATA_FILLING} from "../verification/TthVerificationStatuses";

class CheckingGoodsCountTableContainer extends React.Component {

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        let tableData = [];
        const goods = this.props.goods;
        const realCounts = this.props.realCount;
        const onlyFever = this.props.onlyFever || false;


        for (let i = 0; i < goods.length; i++) {
            tableData.push({
                ...goods[i],
                realCount: realCounts[i] || null
            })
        }

        const onSetCount = (oldValue, newValue, row, column) => {
            const rowN = goods.findIndex(good => good.id === row.id);
            this.props.setGoodRealCount(rowN, newValue);
            if (this.checkIsFieldsFilled()) {
                this.props.setVerificationStatus(DATA_FILLED);
            }
        };

        return (
            <Container>
                <CheckingGoodsCountTable
                    data={tableData}
                    onSetCount={onSetCount.bind(this)}
                    editable={this.props.status === DATA_FILLING}
                    onlyFever={onlyFever}
                />
            </Container>
        )
    }


    checkIsFieldsFilled() {
        const goods = this.props.goods;
        const realCounts = this.props.realCount;

        for (let i = 0; i < goods.length; i++) {
            if (realCounts[i] == null) {
                return false;
            }
        }
        return true;
    }
}

const mapStateToProps = (state) => {
    return {
        goods: state.countTable.goods,
        realCount: state.countTable.goodsCount,
        status: state.countTable.verificationStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGoodRealCount: (row, count) => dispatch(setGoodRealCount(row, count)),
        setVerificationStatus: (status) => dispatch(setVerificationStatus(status)),
        reset: () => dispatch(resetCheckingTable())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckingGoodsCountTableContainer);
