import React from "react";
import {connect} from "react-redux";
import TthService from "../TthService";
import {receiveTthData} from "../actions";
import {setGoods} from "../good_schecking_table/actions";
import {showModal} from "../../info_modal/actions";
import {Container} from "react-bootstrap";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {GoodsTable} from "../../goods/GoodsTable";

class TthInfoContainer extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.tthId;
        this.props.fetchTth(id);
    }

    render() {
        const tth = this.props.tth;
        return (
            <Container>
                <FieldTitle text={"Consignment №" + tth.numberInCompany}/>
                <div>
                    <p>
                        <b>Type: </b>{tth.type.toLowerCase()}
                    </p>
                    <p>
                        <b>Status: </b> {tth.status.toLowerCase().replace("_", " ")}
                    </p>
                    <p>
                        <b>Comment: </b> {tth.consignmentDescription || "No description"}
                    </p>
                    <p>
                        <b>Registration date: </b> {tth.registrationDate || "-"}
                    </p>
                    <p>
                        <b>Verification date: </b> {tth.verificationDate || "-"}
                    </p>
                    <p>
                        <b>Registration complete date: </b> {tth.registrationCompletedDate || "-"}
                    </p>
                </div>
                <div>
                    <p>
                        <b>Dispatcher: </b> {tth.dispatcher ? tth.dispatcher.lastName : "-"}
                    </p>
                    <p>
                        <b>Controller: </b> {tth.controller ? tth.controller.lastName : "-"}
                    </p>
                    <p>
                        <b>Manager: </b> {tth.manager ? tth.manager.lastName : "-"}
                    </p>
                </div>
                <GoodsTable data={tth.goods}/>
            </Container>
        )
    }
}


const fetchTth = (id) => {
    return async dispatch => {
        try {
            const registeredTthData = await TthService.fetchTth(id);
            dispatch(receiveTthData(registeredTthData));
            dispatch(setGoods(registeredTthData.goods))
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        tth: state.tth.tth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTth: (id) => dispatch(fetchTth(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TthInfoContainer)
