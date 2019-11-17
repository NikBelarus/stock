import React from "react";
import {connect} from "react-redux";
import TthService from "../../TthService";
import {showModal} from "../../../info_modal/actions";
import {
    DATA_FILLED,
    DATA_FILLING,
    HAS_CONFLICTS,
    SENT_INCONSISTENCY,
    VERIFICATION_ALLOWED
} from "../../verification/TthVerificationStatuses";
import moment from "moment";
import {OUTPUT} from "../../tthTypes";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import {Button, Container, Row} from "react-bootstrap";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {LOST_IN_STOCK, VERIFICATION_COMPLETED} from "../../../goods/GoodsStatuses";
import CancellationService from "../../../cancellation/CancellationService";
import {receiveTthData, resetGoods, setReady, setRegisteredGoods} from "../../actions";
import {setGoods, setVerificationStatus, setVerifiedGoods} from "../../good_schecking_table/actions";
import CheckingGoodsCountTableContainer from "../../good_schecking_table/CheckingGoodsCountTableContainer";
import {resetCarriage} from "../../../carriage/actions";
import {Redirect} from "react-router-dom";

class VerificationOutputTthContainer extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.tthId;
        this.props.fetchTth(id);
    }
    componentWillUnmount() {
        this.props.reset();
        this.props.setReady(false);
    }

    enableEditing() {
        this.props.setVerificationStatus(DATA_FILLING)
    };

    registerTth() {
        let tth = {
            goods : this.props.countChecking.verifiedGoods,
            id : this.props.tth.id,
            verificationDate: moment(),
            type: OUTPUT,
            controllerId: this.props.user.id
        };
        this.props.fetchThhVerification(tth);
    };

    createCancellationAct() {
        const tthGoods = this.props.tth.goods;
        const realCounts = this.props.countChecking.goodsCount;

        let verifiedGoods = [];
        let shortageGoods = [];
        for (let i = 0; i < tthGoods.length; i++) {
            if (tthGoods[i].count > +realCounts[i]) {
                let shortageCount = tthGoods[i].count - realCounts[i];
                let verifiedGood = {
                    ...tthGoods[i],
                    count: realCounts[i],
                    state: VERIFICATION_COMPLETED,
                };
                let shortageGood = {
                    ...tthGoods[i],
                    count: shortageCount,
                    state: LOST_IN_STOCK,
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

        let cancellationAct = {
            controllerId: this.props.user.id,
            date: moment(),
            goods: shortageGoods
        };
        if (window.confirm("Create cancellation act? \n" +
            "Responsible worker - " + this.props.user.lastName + '\n' +
            +"Lost in stock goods :" + shortageGoods.map(good => " name:" + good.name + " count " + good.count + '\n')
        )) {
            this.props.fetchCancellation(cancellationAct);
            this.props.setRegisteredGoods(verifiedGoods);
            this.props.setVerificationStatus(SENT_INCONSISTENCY);
        }
    };

    checkAccordance() {
        const goods = this.props.tth.goods;
        const realCounts = this.props.countChecking.goodsCount;

        for (let i = 0; i < goods.length; i++) {
            if (goods[i].count > +realCounts[i]) {
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
        if(this.props.ready){
            return <Redirect to ="/home"/>
        }
        const formHeader = (
            <Container>
                <FieldTitle text='Output consignment verification'/>
                <p>
                    <b>Date: </b> {new Date().toDateString()}
                </p>
                <p>
                    <b>Checking: </b> {user.firstName + ' ' + user.lastName + ' ' + user.parentName}
                </p>
                <p>Please, enter count of goods exported from stock</p>
            </Container>
        );
        return (
            <Container>
                {formHeader}
                <Container>
                    <CheckingGoodsCountTableContainer
                        onlyFever={true}>
                    </CheckingGoodsCountTableContainer>
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
                            <Button variant="primary" onClick={this.createCancellationAct.bind(this)}>
                                Create cancellation act
                            </Button>
                            <Button variant="secondary" onClick={this.enableEditing.bind(this)}>
                                Change data
                            </Button>
                        </ButtonToolbar>
                    </div>
                    <div hidden={verificationStatus !== VERIFICATION_ALLOWED}>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.registerTth.bind(this)}>
                                Confirm checking
                            </Button>
                            <Button variant="secondary" onClick={this.enableEditing.bind(this)}>
                                Change data
                            </Button>
                        </ButtonToolbar>
                    </div>
                    <div hidden={verificationStatus !== SENT_INCONSISTENCY}>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.registerTth.bind(this)}>
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

export const fetchCancellation = (cancellation) => {
    return async dispatch => {
        try {
            const response = await CancellationService.fetchCreateCanncellationAct(cancellation);
            dispatch(showModal(response.message))
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};


const mapStateToProps = (state) => {
    return {
        tth: state.tth.tth,
        ready: state.tth.ready,
        user: state.authorisation.user,
        loading: state.loading.loading,
        modal: state.modal,
        countChecking: state.countTable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTth: (id) => dispatch(fetchTth(id)),
        setVerificationStatus: (status) => dispatch(setVerificationStatus(status)),
        fetchThhVerification: (tth) => dispatch(fetchThhVerification(tth)),
        fetchCancellation: (cancellation) => dispatch(fetchCancellation(cancellation)),
        setVerifiedGoods: (goods) => dispatch(setVerifiedGoods(goods)),
        setRegisteredGoods: (goods) => dispatch(setRegisteredGoods(goods)),
        setReady:(ready) => dispatch(setReady(ready)),
        reset: () => {
            dispatch(resetCarriage());
            dispatch(resetGoods());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationOutputTthContainer);
