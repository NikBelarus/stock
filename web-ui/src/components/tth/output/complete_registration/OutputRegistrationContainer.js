import React from "react";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import Form from "react-bootstrap/Form";
import {VehicleTypeSelect} from "../../input/creation/VehicleTypeSelect";
import {DriverSelect} from "../../input/creation/DriverSelect";
import {GoodsTable} from "../../../goods/GoodsTable";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import TthService from "../../TthService";
import {receiveTthData, resetGoods, setReady} from "../../actions";
import {setGoods} from "../../good_schecking_table/actions";
import {showModal} from "../../../info_modal/actions";
import {
    receiveDriversList,
    resetCarriage,
    selectDriver,
    selectVehicleType,
    typeVehicleNo
} from "../../../carriage/actions";
import DriverService from "../../../carriage/DriverService";
import moment from "moment";
import Redirect from "react-router-dom/es/Redirect";

class OutputRegistrationContainer extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.tthId;
        this.props.fetchTth(id);
    }
    componentWillUnmount() {
        this.props.setReady(false);
    }

    selectDriver = (e) => {
        const driverId = e.target.value;
        const driversList = this.props.carriage.drivers.list;
        this.props.selectDriver(driversList.find(driver => driver.id === +driverId));
    };
    selectVehicleType = (e) => {
        const vehicleType = e.target.value;
        this.props.selectVehicleType(vehicleType);
        const carrierId = this.props.tth.carrier.id;
        this.props.fetchCarrierDrivers(carrierId)
    };
    onTypeVehicle(e){
        this.props.typeVehicleNo(e.target.value);
    }

    register = () => {
        const driverId = this.props.carriage.drivers.selectedDriver.id;
        if (!driverId) {
            this.props.showModal("Choose driver", "Driver is required");
            return;
        }
        const vehicleNo = document.getElementById("vehicle").value;
        if (vehicleNo === "") {
            this.props.showModal("Enter vehicle number", "Vehicle number is required");
            return;
        }
        const vehicleType = this.props.carriage.vehicleType;

        if (!vehicleType) {
            this.props.showModal("Choose vehicle type", "Vehicle type is required");
            return;
        }
        let registrationTth = {
            ...this.props.tth,
            managerId: this.props.user.id,
            driverId: this.props.carriage.drivers.selectedDriver.id,
            vehicleType: this.props.carriage.vehicleType,
            registrationCompletedDate: moment(),
            vehicleNo: document.getElementById("vehicle").value
        };

        this.props.allowRelease(registrationTth);
    };

    render() {
        const user = this.props.user;
        const driversList = this.props.carriage.drivers.list;
        const driver = this.props.carriage.drivers.selectedDriver;
        const vehicleType = this.props.carriage.vehicleType;
        const vehicleNo = this.props.carriage.vehicleNo;

        const goods = this.props.goods;


        const formHeader = (
            <Container>
                <FieldTitle text='Output consignment registration'/>
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

        if(this.props.tth.ready){
            return <Redirect to ="/home"/>
        }
        return (
            <Container>
                <Form noValidate>
                    {formHeader}
                    <VehicleTypeSelect vehicleType={vehicleType}
                                       selectVehicleType={this.selectVehicleType}/>
                    <div hidden={vehicleType === ""}>
                        <DriverSelect driver={driver}
                                      list={driversList}
                                      selectDriver={this.selectDriver}/>
                        <Form.Group required controlId="vehicleNumberPlaintext" id="vehicleNo" onChange={this.onTypeVehicle.bind(this)}  value={vehicleNo}>
                            <Form.Label column sm="10">
                                Vehicle number or container numbers
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required type="text" name="vehicle_number" id="vehicle"/>
                                <Form.Control.Feedback type="invalid">
                                    Please, enter correct vehicle number or container numbers.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </div>
                    <GoodsTable data={this.props.goods}/>
                    <Row className="justify-content-md-center">
                        <Button variant="primary" size="lg" onClick={this.register}>
                            Register new consignment
                        </Button>
                    </Row>
                </Form>
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

export const allowRelease = (tth) => {
    return async dispatch => {
        try {
            const response = await TthService.completeTthRegistration(tth);
            dispatch(showModal("Done", "Release allowed"));
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
        carriage: state.carriage,
        goods:state.tth.tth.goods
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTth: (id) => dispatch(fetchTth(id)),
        allowRelease: (tth) => dispatch(allowRelease(tth)),
        selectDriver: (driver) => dispatch(selectDriver(driver)),
        selectVehicleType: (vehicleType) => dispatch(selectVehicleType(vehicleType)),
        fetchCarrierDrivers: (carrierId) => dispatch(fetchCarrierDrivers(carrierId)),
        showModal: (header, message) => dispatch(showModal(header, message)),
        typeVehicleNo: (no) => dispatch(typeVehicleNo(no)),
        reset: () => {
            dispatch(resetCarriage());
            dispatch(resetGoods());
        },
        setReady: (ready) => dispatch(setReady(ready))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OutputRegistrationContainer);
