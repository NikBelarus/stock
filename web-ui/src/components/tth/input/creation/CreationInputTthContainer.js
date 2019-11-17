import React from "react";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import Form from "react-bootstrap/Form";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import CarrierService from "../../../carriage/CarrierService";
import {setLoadingFalse, setLoadingTrue} from "../../../loading/actions";
import {showModal} from "../../../info_modal/actions";
import {
    receiveCarriersList,
    receiveDriversList,
    resetCarriage,
    selectCarrier,
    selectDriver,
    selectVehicleType,
    typeVehicleNo
} from "../../../carriage/actions";
import DriverService from "../../../carriage/DriverService";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {ShortGoodsTable} from "../../ShortGoodsTable";
import GoodCreateFormContainer from "../../../goods/GoodCreateFormContainer";
import {DriverSelect} from "./DriverSelect";
import Col from "react-bootstrap/Col";
import {CarrierSelect} from "./CarrierSelect";
import {VehicleTypeSelect} from "./VehicleTypeSelect";
import TthService from "../../TthService";
import {REGISTERED} from "../../tthStatuses";
import moment from "moment";
import {INPUT} from "../../tthTypes";
import {resetGoods} from "../../actions";

class CreationInputTthContainer extends React.Component {
    componentDidMount() {
        this.props.fetchCompanyCarriers();
    }
    componentWillUnmount() {
    }

    validated = false;

    toNewCarrierPage() {
        this.props.history.push("/carriers/new");
    };

    toNewDriverPage() {
        this.props.history.push("/drivers/new");
    }
    onTypeVehicle(e){
        this.props.typeVehicleNo(e.target.value);
    }


    selectCarrier = (e) => {
        const carrierId = e.target.value;
        if (carrierId !== -1) {
            const carriersList = this.props.carriage.carriers.list;
            this.props.selectCarrier(carriersList.find(carrier => carrier.id === +carrierId));
            this.props.fetchCarrierDrivers(carrierId);
        }
    };
    selectDriver = (e) => {
        const driverId = e.target.value;
        if (driverId !== -1) {
            const driversList = this.props.carriage.drivers.list;
            this.props.selectDriver(driversList.find(driver => driver.id === +driverId));
        }
    };
    selectVehicleType = (e) => {
        const vehicleType = e.target.value;
        if (vehicleType !== -1) {
            this.props.selectVehicleType(vehicleType);
        }
    };

    render() {
        const user = this.props.user;

        const carriersList = this.props.carriage.carriers.list;
        const driversList = this.props.carriage.drivers.list;

        const vehicleType = this.props.carriage.vehicleType;

        const carrier = this.props.carriage.carriers.selectedCarrier;
        const driver = this.props.carriage.drivers.selectedDriver;

        const vehicleNo = this.props.carriage.vehicleNo;
        const goods = this.props.goods;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const elements = e.target.elements;
            if (goods.length < 1) {
                this.props.showModal("No goods", "At least one good is required");
                this.validated = false;
            } else if (form.checkValidity()) {
                this.validated = true;
                let tth = {};
                tth.consignmentDescription = elements.comment.value;
                tth.vehicleType = vehicleType;
                tth.vehicleNo = elements.vehicle.value;
                tth.registrationDate = moment();
                tth.carrierId = carrier.id;
                tth.stockId = user.stockId;
                tth.companyId = user.companyId;
                tth.dispatcherId = user.id;
                tth.driverId = driver.id;
                tth.goods = goods;
                tth.type = INPUT;
                tth.status = REGISTERED;

                this.props.fetchCreateTth(tth);
                this.validated = false;
            }
        };
        const formHeader = (
            <Container>
                <FieldTitle text='New input consignment note'/>
                <p>
                    <b>Date: </b> {new Date().toDateString()}
                </p>
                <p>
                    <b>Dispatcher: </b> {user.firstName + ' ' + user.lastName + ' ' + user.parentName}
                </p>
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
                <Form noValidate validated={this.validated} onSubmit={handleSubmit}>
                    {formHeader}
                    <CarrierSelect carrier={carrier}
                                   list={carriersList}
                                   selectCarrier={this.selectCarrier}
                                   toCarrierPage={this.toNewCarrierPage.bind(this)}
                    />
                    <div hidden={carrier === null}>
                        <VehicleTypeSelect vehicleType={vehicleType}
                                           selectVehicleType={this.selectVehicleType}/>
                    </div>
                    <div hidden={vehicleType === ""}>
                        <DriverSelect driver={driver}
                                      list={driversList}
                                      selectDriver={this.selectDriver}
                                      toDriverPage={this.toNewDriverPage.bind(this)}/>
                    </div>
                    <Container hidden={driver === null}>
                        <Form.Group required controlId="vehicleNumberPlaintext">
                            <Form.Label column sm="10">
                                Vehicle number or container numbers
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required type="text" name="vehicle_number" onChange={this.onTypeVehicle.bind(this)} id="vehicle" value={vehicleNo}/>
                                <Form.Control.Feedback type="invalid">
                                    Please, enter correct vehicle number or container numbers.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col md="7">
                                <ShortGoodsTable goods={this.props.goods}
                                                 user={this.props.user}/>
                            </Col>
                            <Col md="5">
                                <GoodCreateFormContainer/>
                            </Col>
                        </Row>
                        <p>
                        </p>
                        <Form.Group as={Row} controlId="commentPlaintext">
                            <Form.Label>
                                Comment
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="textarea" name="comment" id="comment"/>
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Button variant="primary" type="submit" size="lg">
                                Register new tth
                            </Button>
                        </Row>
                    </Container>
                    <Row className="justify-content-right">
                        <Button variant="secondary" onClick={this.props.reset.bind(this)}>
                            Reset data
                        </Button>
                    </Row>
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
            dispatch(setLoadingFalse());
            dispatch(receiveCarriersList(carriersData.content));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal("Error ", e.message));
        }
    };
};

const fetchCarrierDrivers = (carrierId) => {
    return async dispatch => {
        try {
            const driversData = await DriverService.getCarrierDrivers(carrierId);
            dispatch(receiveDriversList(driversData.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    };
};

export const fetchCreateTth = (tth) => {
    return async dispatch => {
        try {
            const response = await TthService.fetchCreateInput(tth);
            dispatch(showModal(response.message));
            dispatch(resetCarriage());
            dispatch(resetGoods());
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
        goods: state.tth.goods
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompanyCarriers: () => dispatch(fetchCompanyCarriers()),
        fetchCarrierDrivers: (carrierId) => dispatch(fetchCarrierDrivers(carrierId)),
        selectCarrier: (carrier) => dispatch(selectCarrier(carrier)),
        selectDriver: (driver) => dispatch(selectDriver(driver)),
        selectVehicleType: (vehicleType) => dispatch(selectVehicleType(vehicleType)),
        showModal: (header, message) => dispatch(showModal(header, message)),
        fetchCreateTth: (tth) => dispatch(fetchCreateTth(tth)),
        typeVehicleNo: (no) => dispatch(typeVehicleNo(no)),
        reset: () => {
            dispatch(resetCarriage());
            dispatch(resetGoods());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationInputTthContainer);
