import React from "react";
import {connect} from "react-redux";
import {receiveCarriersList, resetCarriage, selectCarrier} from "../../../carriage/actions";
import {showModal} from "../../../info_modal/actions";
import TthService from "../../TthService";
import {setLoadingFalse, setLoadingTrue} from "../../../loading/actions";
import CarrierService from "../../../carriage/CarrierService";
import {Container} from "react-bootstrap";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import {CarrierSelect} from "../../input/creation/CarrierSelect";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import GoodService from "../../../goods/GoodService";
import CheckingGoodsCountTableContainer from "../../good_schecking_table/CheckingGoodsCountTableContainer";
import {OUTPUT} from "../../tthTypes";
import moment from "moment";
import {REGISTERED} from "../../tthStatuses";
import {setGoods} from "../../good_schecking_table/actions";

class CreationOutputTthContainer extends React.Component {
    componentDidMount() {
        this.props.fetchCompanyCarriers();
    }
    componentWillUnmount() {
        this.props.reset();
    }

    validated = false;

    selectCarrier = (e) => {
        const carrierId = e.target.value;
        const carriersList = this.props.carriage.carriers.list;
        this.props.selectCarrier(carriersList.find(carrier => carrier.id === +carrierId));
        this.props.fetchCarrierGoods(carrierId);
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const goods = this.props.goods || [];
        const counts = this.props.goodsCount;

        let goodsToExport = [];
        for (let i = 0; i < goods.length; i++) {
            if (+counts[i] > 0) {
                goodsToExport.push({
                    ...goods[i],
                    count: counts[i]
                })
            }
        }
        if (goodsToExport.length === 0) {
            this.props.showModal("No goods", "At least one good expected");
            return;
        }
        const commentEl = document.getElementById("comment");
        let tth = {
            goods: goodsToExport,
            consignmentDescription: commentEl.value,
            type: OUTPUT,
            registrationDate: moment(),
            stockId: this.props.user.stockId,
            carrierId: this.props.carriage.carriers.selectedCarrier.id,
            status: REGISTERED,
            managerId: this.props.user.id,
            companyId: this.props.user.companyId,
        };
        this.props.fetchCreateTth(tth);
    };


    render() {
        const user = this.props.user;
        const carriersList = this.props.carriage.carriers.list;
        const carrier = this.props.carriage.carriers.selectedCarrier;
        console.log(carrier);
        console.log(carriersList);
        const formHeader = (
            <Container>
                <FieldTitle text='New output consignment note'/>
                <p>
                    <b>Date: </b> {new Date().toDateString()}
                </p>
                <p>
                    <b>Manager: </b> {user.firstName + ' ' + user.lastName + ' ' + user.parentName}
                </p>
                <p>Please, enter count to export </p>
            </Container>
        );
        const isShownModal = this.props.modal.isShown;
        const loading = this.props.loading;
        if (loading) {
            return <Loading/>
        }
        if (isShownModal) {
            return <InfoModalContainer/>
        }
        return (
            <Container>
                <Form noValidate validated={this.validated} id="form">
                    {formHeader}

                    <CarrierSelect carrier={carrier}
                                   list={carriersList}
                                   selectCarrier={this.selectCarrier}/>
                    <div hidden={carrier === null}>
                        <Row className="justify-content-center">
                            <Button variant="secondary" onClick={this.props.reset.bind(this)}>
                                Choose other
                            </Button>
                        </Row>
                        <Container>
                            <CheckingGoodsCountTableContainer
                                onlyFever={true}/>
                        </Container>
                        <Form.Group as={Row} controlId="commentPlaintext">
                            <Form.Label>
                                Comment
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="textarea" name="comment" id="comment"/>
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Button variant="primary" onClick={this.handleSubmit} size="lg">
                                Register new output consignment
                            </Button>
                        </Row>
                    </div>
                </Form>
            </Container>
        )
    }
}

export const fetchCompanyCarriers = () => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const carriersData = await CarrierService.getCompanyCarriers();
            dispatch(receiveCarriersList(carriersData.content));
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal("Error ", e.message));
        }
    };
};

export const fetchCarrierGoods = (carrierId) => {
    return async dispatch => {
        try {
            const carrierGoodsData = await GoodService.fetchCarrierStockGoods(carrierId);
            dispatch(setGoods(carrierGoodsData.content))
        } catch (e) {
            dispatch(showModal("Error", e.message))
        }
    }
};

export const fetchCreateTth = (tth) => {
    return async dispatch => {
        try {
            const response = await TthService.fetchCreateOutput(tth);
            dispatch(showModal(response.message));
            dispatch(resetCarriage());
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    };
};

const mapStateToProps = state => {
    return {
        carriage: state.carriage,
        user: state.authorisation.user,
        loading: state.loading.loading,
        modal: state.modal,
        goods: state.countTable.goods,
        goodsCount: state.countTable.realGoodCount
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompanyCarriers: () => dispatch(fetchCompanyCarriers()),
        selectCarrier: (carrier) => dispatch(selectCarrier(carrier)),
        showModal: (header, message) => dispatch(showModal(header, message)),
        fetchCreateTth: (tth) => dispatch(fetchCreateTth(tth)),
        fetchCarrierGoods: (carrierId) => dispatch(fetchCarrierGoods(carrierId)),
        reset: () => {
            dispatch(resetCarriage());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationOutputTthContainer);
