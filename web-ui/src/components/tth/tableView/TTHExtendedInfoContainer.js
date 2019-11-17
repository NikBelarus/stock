import React from "react";
import {FieldTitle} from "../../basecomponents/content/FieldTitle";
import {connect} from "react-redux";

class TTHExtendedInfoContainer extends React.Component {
    render() {
        const tth = this.props.tthInfoTable.tth[0];
        console.log(tth);
        return (
            <article>
                <FieldTitle text="Consignment"/>
                <p>
                    <b>Number:</b> {tth.numberInCompany}
                </p>
                <p>
                    <b>Type:</b> {tth.type}
                </p>
                <p>
                    <b>Status:</b> {tth.status}
                </p>
                <p>
                    <b>Vehicle type:</b> {tth.vehicleType ? tth.vehicleType.toLowerCase() : ''}
                </p>
                <p>
                    <b>Vehicle number:</b> {tth.vehicleNo}
                </p>
                <p>
                    <b>Consignment description:</b> {tth.consignmentDescription}
                </p>
                <p>
                    <b>Carrier:</b> {tth.carrier ? tth.carrier.name : ''}
                </p>
                <p>
                    <b>Driver:</b> {tth.driver ? tth.driver.firstName + ' ' + tth.driver.lastName : ''}
                </p>
                <p>
                    <b>Controller:</b> {tth.controller ? tth.controller.firstName + ' ' + tth.controller.lastName + ' ' + tth.controller.parentName : ''}
                </p>
                <p>
                    <b>Dispatcher:</b> {tth.dispatcher ? tth.dispatcher.firstName + ' ' + tth.dispatcher.lastName + ' ' + tth.dispatcher.parentName : ''}
                </p>
                <p>
                    <b>Manager:</b> {tth.manager ? tth.manager.firstName + ' ' + tth.manager.lastName + ' ' + tth.manager.parentName : ''}
                </p>
                <p>
                    <b>Registration date:</b> {tth.registrationDate ? tth.registrationDate.replace("T", " ") : ''}
                </p>
                <p>
                    <b>Verification date:</b> {tth.verificationDate ? tth.verificationDate.replace("T", " ") : ''}
                </p>
                <p>
                    <b>Registration completed date:</b> {tth.registrationCompletedDate ? tth.registrationCompletedDate.replace("T", " ") : ''}
                </p>
            </article>
        )
    }
}

const mapStateToProps =(state) =>{
    return{
        ...state
    }
};

const mapDispatchToProps = dispatch => {
    return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(TTHExtendedInfoContainer)
