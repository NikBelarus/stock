import React from "react";
import {Col, Button} from "react-bootstrap";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import Loading from "../loading/Loading";
import StockService from "./StockService";
import GetLocation from "./GetLocation";
import {receiveStockCreateResult, setButtonVisibility, setLocation} from "./action";
import {setValidFalse, setValidTrue} from "../validation/actions";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import {showModal} from "../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import {Link} from "react-router-dom";

class AddStockForm extends React.Component{
    render(){

        const {stock} = this.props.stock;
        const {validated} = this.props.validation;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        const {step} = this.props.stock;

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={props.location}
            >
            <Marker
                    position={props.location}
                />   
            </GoogleMap>
        ));

        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if(e.target.elements.house.value <= 0){
                this.props.callInfoModal('Warning', 'The house value is invalid.');
            } else if (!form.checkValidity()) {
                this.props.setValid(true);
            }
            else {
                this.props.setValid(false);
                let address = {};
                stock.city = address.city = e.target.elements.city.value;
                stock.street = address.street = e.target.elements.street.value;
                stock.house = address.street_number = e.target.elements.house.value;
                if(this.props.authorisation.user.companyId){
                    stock.companyId = this.props.authorisation.user.companyId;
                    const loc = await GetLocation.getGeo(address);
                    console.log(loc);
                    if(loc.status === 'OK' && loc.results[0].address_components.length > 6){
                        stock.latitude = loc.results[0].geometry.location.lat;
                        stock.longitude = loc.results[0].geometry.location.lng;
                        this.props.changeLocation(loc.results[0].geometry.location);
                        this.props.changeButtonVisibility('block');
                        this.props.fetchStockCreate(stock);
                    } else {
                        this.props.callInfoModal('Error', 'The address is invalid, try again!');
                    }
                } else{
                    this.props.callInfoModal('Warning', 'Company is undefined!');
                }
            }
        };

        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>;
        }
        return(
            <div id="stock-container">
                <FieldTitle text="Create stock form"/>
                <div id="map-container">
                    <div id="map">
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGmR6yu8KkNXWuQQOJ-4tacQ7CsDJXlMM&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            location={this.props.stock.location}
                        />
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="city">City</Form.Label>
                                <Form.Control required type="text" id="city" name="city"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="street">Street</Form.Label>
                                <Form.Control required type="text" id="street" name="street"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="house">House</Form.Label>
                                <Form.Control required type="number" id="house" name="house"/>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">Search on Map</Button>
                        <Button variant="primary" type="submit" style={{display: this.props.stock.buttonVis}} id="nextStepButton">
                            <Link style={{color: "white"}} to="/stock/new/cells">Next step</Link>
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export const setValid = (flag) => {
    return async dispatch => {
        if(flag){
            dispatch(setValidTrue());
        }
        else {
            dispatch(setValidFalse());
        }
    }
};

export const changeLocation = (location) => {
    return async dispatch => {
        dispatch(setLocation(location));
    }
};

export const changeButtonVisibility = (visibility) => {
    return async dispatch => {
        dispatch(setButtonVisibility(visibility));
    }
};

export const fetchStockCreate = (stockData) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const stock = await StockService.addStock(stockData);
            dispatch(setLoadingFalse());
            dispatch(receiveStockCreateResult(stock));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    }
};

export const callInfoModal =(header, message) => {
    return async dispatch => {
        dispatch(showModal(header, message));
    }
};


const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: (location) => dispatch(setLocation(location)),
        setValid: (flag) => dispatch(setValid(flag)),
        fetchStockCreate: (stock) => dispatch(fetchStockCreate(stock)),
        callInfoModal: (header, message) => dispatch(callInfoModal(header, message)),
        changeButtonVisibility: (visibility) => dispatch(changeButtonVisibility(visibility))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStockForm);
