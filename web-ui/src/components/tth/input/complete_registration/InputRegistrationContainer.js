import React from "react";
import {connect} from "react-redux";
import Loading from "../../../loading/Loading";
import InfoModalContainer from "../../../info_modal/InfoModalContainer";
import {FieldTitle} from "../../../basecomponents/content/FieldTitle";
import {Button, Container, Row} from "react-bootstrap";
import GoodsAccommodationTableContainer from "./GoodsAccommodationTableContainer";
import TthService from "../../TthService";
import {receiveTthData, setReady} from "../../actions";
import {showModal} from "../../../info_modal/actions";
import CellsService from "../../../stocks/cells/CellsService";
import {receiveCells, setSent} from "./actions";
import Redirect from "react-router-dom/es/Redirect";
import moment from "moment";

class InputRegistrationContainer extends React.Component{
    componentDidMount() {
        const id = this.props.match.params.tthId;
        this.props.fetchVerifiedTth(id);
        this.props.fetchStockCells(this.props.user.stockId);
    }
    componentWillUnmount() {
        this.props.setReady(false);
    }

    confirmAccommodation(){
        let tth = this.props.tth;
        tth.goods = this.props.goods;
        tth.registrationCompletedDate = moment();
        tth.managerId = this.props.user.id;
        TthService.completeTthRegistration(tth)
            .then(responce =>{
                this.props.showModal("Complete!","Goods are accepted for storage");
                this.props.setSent(true);
                this.props.setReady(true);
            });
    };

    render() {
        const user = this.props.user;

        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>
        }
        if(this.props.sent){
            return <Redirect to="/home"/>
        }
        if(this.props.tth.ready){
            return <Redirect to="/home"/>
        }
        const formHeader = (
            <Container>
                <FieldTitle text="Goods accommodation"/>
                <p>
                    <b>Date: </b> {new Date().toDateString()}
                </p>
                <p>
                    <b>Accommodation worker: </b> {user.firstName + ' ' + user.lastName + ' ' + user.parentName}
                </p>
                <p>Please choose cell for every good to continue</p>
            </Container>
        );
        return (
            <Container>
                {formHeader}
                <GoodsAccommodationTableContainer/>
                <Row className="justify-content-md-center">
                    <div hidden ={!this.props.accommodationComplete}>
                        <Button onClick={this.confirmAccommodation.bind(this)}>
                            Confirm accommodation
                        </Button>
                    </div>
                </Row>
            </Container>
        )
    }
}
export const fetchVerifiedTth = (id) => {
    return async dispatch => {
        try {
            const registeredTthData = await TthService.fetchTth(id);
            dispatch(receiveTthData(registeredTthData));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    };
};

export const fetchStockCells =(stockId) => {
    return async dispatch => {
        try {
            const cells = await CellsService.getStockCells(stockId);
            dispatch(receiveCells(cells.content));
        } catch (e) {
            dispatch(showModal("Error ", e.message));
        }
    }
};

const mapStateToProps = (state) =>{
    return{
        user : state.authorisation.user,
        loading: state.loading.loading,
        modal: state.modal,
        tth: state.tth.tth,
        goods: state.accommodation.goods,
        accommodationComplete: state.accommodation.accommodationComplete,
        sent: state.accommodation.sent
    }
};

const mapDispatchToProps = dispatch => {
    return{
        fetchVerifiedTth: (id) => dispatch(fetchVerifiedTth(id)),
        fetchStockCells:(stockId) => dispatch(fetchStockCells(stockId)),
        showModal:(header, message) => dispatch(showModal(header, message)),
        setSent: (sent) =>  dispatch(setSent(sent)),
        setReady: (ready) => dispatch(setReady(ready))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputRegistrationContainer)
