import React from "react";
import TthService from "../../TthService";
import {showModal} from "../../../info_modal/actions";
import {receiveTthData, setReady, setRegisteredGoods} from "../../actions";
import {Button, Container, Row} from "react-bootstrap";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import {connect} from "react-redux";
import CheckingGoodsCountTableContainer from "../../good_schecking_table/CheckingGoodsCountTableContainer";
import {setGoods, setVerificationStatus, setVerifiedGoods} from "../../good_schecking_table/actions";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import moment from "moment";
import {FORFEIT, LOST_BY_CARRIER, VERIFICATION_COMPLETED} from "../../../goods/GoodsStatuses";
import InconsistencyService from "../../../inconsistency/InconsistencyService";
import {INPUT} from "../../tthTypes";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import {
    DATA_FILLED,
    DATA_FILLING,
    HAS_CONFLICTS,
    SENT_INCONSISTENCY,
    VERIFICATION_ALLOWED
} from "../../verification/TthVerificationStatuses";
import {Redirect} from "react-router-dom";

class VerificationInputTthContainer extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.tthId;
        this.props.fetchRegisteredTth(id);
    }

    componentWillUnmount() {
        this.props.setReady(false);
    }

    createInconsistencyAct() {
        const tthGoods = this.props.tth.goods;
        const realCounts = this.props.countChecking.goodsCount;

        let verifiedGoods = [];
        let surplusGoods = [];
        let shortageGoods = [];

        for (let i = 0; i < tthGoods.length; i++) {
            if (tthGoods[i].count < +realCounts[i]) {
                let surplusCount = realCounts[i] - tthGoods[i].count;
                let verifiedGood = tthGoods[i];
                let surplusGood = {
                    ...tthGoods[i],
                    count: surplusCount,
                    state: FORFEIT
                };
                verifiedGoods.push(verifiedGood);
                surplusGoods.push(surplusGood);
            } else if (tthGoods[i].count > +realCounts[i]) {
                let shortageCount = tthGoods[i].count - realCounts[i];
                let verifiedGood = {
                    ...tthGoods[i],
                    count: realCounts[i],
                    state: VERIFICATION_COMPLETED
                };
                let shortageGood = {
                    ...tthGoods[i],
                    count: shortageCount,
                    state: LOST_BY_CARRIER,
                };
                verifiedGoods.push(verifiedGood);
                shortageGoods.push(shortageGood);
            } else if (tthGoods[i].count === +realCounts[i]) {
                verifiedGoods.push({
                    ...tthGoods[i],
                    state: VERIFICATION_COMPLETED
                })
            }
        }

        let inconsistencyAct = {
            driverId: this.props.tth.driver.id,
            userId: this.props.user.id,
            date: moment(),
            goods: surplusGoods.concat(shortageGoods)
        };

        if (window.confirm("Create inconsistency act? \n" +
            "Driver - " + this.props.tth.driver.lastName + "\n" +
            "Responsible worker - " + this.props.user.lastName + '\n' +
            "Forfeit goods :" + surplusGoods.map(good => " name:" + good.name + " count " + good.count + '\n')
            + "Lost by carrier :" + shortageGoods.map(good => " name:" + good.name + " count " + good.count + '\n')
        )) {
            this.props.fetchInconsistency(inconsistencyAct);
            this.props.setRegisteredGoods(verifiedGoods);
            this.props.setVerificationStatus(SENT_INCONSISTENCY);
        }
    };

    enableEditing() {
        this.props.setVerificationStatus(DATA_FILLING)
    };

    registerThh() {
        let tth = {
            goods: this.props.countChecking.verifiedGoods,
            id: this.props.tth.id,
            verificationDate: moment(),
            type: INPUT,
            controllerId: this.props.user.id
        };

        this.props.fetchThhVerification(tth);
        this.props.history.push("/home");
    };

    checkAccordance() {
        const goods = this.props.tth.goods;
        const realCounts = this.props.countChecking.goodsCount;

        for (let i = 0; i < goods.length; i++) {
            if (goods[i].count !== +realCounts[i]) {
                this.props.setVerificationStatus(HAS_CONFLICTS);
                return;
            }
        }

        this.props.setVerifiedGoods(goods);
        this.props.setVerificationStatus(VERIFICATION_ALLOWED);
    };

    render() {
        const user = this.props.user;
        const verificationStatus = this.props.countChecking.verificationStatus;


        const {loading} = this.props.loading;
        if (loading) {
            return <Loading/>;
        }

        const {isShown} = this.props.modal;
        if (isShown) {
            return <InfoModalContainer/>
        }

        if(this.props.tth.ready){
            return <Redirect to ="/home"/>
        }

        const formHeader = (
            <Container>
                <FieldTitle text='Input consignment verification'/>
                <p>
                    <b>Date: </b> {new Date().toDateString()}
                </p>
                <p>
                    <b>Checking: </b> {user.firstName + ' ' + user.lastName + ' ' + user.parentName}
                </p>
                <p>Please enter real goods count</p>
            </Container>
        );

        return (
            <Container>
                {formHeader}
                <Container>
                    <CheckingGoodsCountTableContainer
                        onlyFever={false}/>
                </Container>
                <Row className="justify-content-center">
                    <div hidden={verificationStatus !== DATA_FILLED}>
                        <Button variant="primary" onClick={this.checkAccordance.bind(this)}>
                            Сheck good's count
                        </Button>
                    </div>
                    <div hidden={verificationStatus !== HAS_CONFLICTS}>
                        <p>There was found inconsistencies</p>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.createInconsistencyAct.bind(this)}>
                                Create inconsistency act
                            </Button>
                            <Button variant="secondary" onClick={this.enableEditing.bind(this)}>
                                Change data
                            </Button>
                        </ButtonToolbar>
                    </div>
                    <div hidden={verificationStatus !== VERIFICATION_ALLOWED}>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.registerThh.bind(this)}>
                                Confirm checking
                            </Button>
                            <Button variant="secondary" onClick={this.enableEditing.bind(this)}>
                                Change data
                            </Button>
                        </ButtonToolbar>
                    </div>
                    <div hidden={verificationStatus !== SENT_INCONSISTENCY}>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.registerThh.bind(this)}>
                                Confirm checking
                            </Button>
                        </ButtonToolbar>
                    </div>
                </Row>
            </Container>

        )
    }
}


export const fetchTth = (id) => {
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

export const fetchInconsistency = (inconsistensy) => {
    return async dispatch => {
        try {
            const response = await InconsistencyService.fetchCreateInconsistency(inconsistensy);
            dispatch(showModal(response.message))
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

export const fetchThhVerification = (tth) => {
    return async dispatch => {
        try {
            const response = await TthService.fetchVerifiedTth(tth);
            dispatch(showModal(response.message));
            dispatch(setReady(true));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = state => {
    return {
        tth: state.tth.tth,
        user: state.authorisation.user,
        loading: state.loading.loading,
        modal: state.modal,
        countChecking: state.countTable
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchRegisteredTth: (id) => dispatch(fetchTth(id)),
        setVerificationStatus: (status) => dispatch(setVerificationStatus(status)),
        fetchThhVerification: (tth) => dispatch(fetchThhVerification(tth)),
        fetchInconsistency: (inconsistency) => dispatch(fetchInconsistency(inconsistency)),
        setVerifiedGoods: (goods) => dispatch(setVerifiedGoods(goods)),
        setRegisteredGoods: (goods) => dispatch(setRegisteredGoods(goods)),
        setReady:(ready) => dispatch(setReady(ready))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationInputTthContainer);


