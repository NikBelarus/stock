import React from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import {setValidFalse, setValidTrue} from "../validation/actions";
import {showModal} from "../info_modal/actions";
import moment from "moment";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";
import ReportService from "./ReportService";
import {setFinishDay, setNewStats, setStartDay} from "./action";
import ChartistGraph from 'react-chartist';

class ReportContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            statsData: {
                labels: [],
                series: []
            },
            options:{
                high: 10,
                low: 0,
                height: '250px',
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }
        };
    }

    render(){
        const type = 'Line';

        const {isShown} = this.props.modal;
        const {validated} = this.props.validation;

        if (isShown) {
            return <InfoModalContainer/>;
        }

        const writeChart = () => {
            const stats = this.props.report.stats.content;
            this.props.setFirstDay(stats[0].date);
            this.props.setLastDay(stats[stats.length-1].date);
            let max = 0;
            let min = 0;
            let labels = [];
            let series = [[], [], []];
            for(let i = 0; i < stats.length; i++){
                if(stats[i].income > max) { max = stats[i].income; }
                if(stats[i].income - stats[i].consumption < min) {min = stats[i].income - stats[i].consumption;}
                labels[i] = stats[i].date;
                series[0][i] = stats[i].income;
                series[1][i] = stats[i].consumption;
                series[2][i] = stats[i].income - stats[i].consumption;
            }
            this.setState({
                statsData: {
                    labels: labels,
                    series: series,
                },
                options:{
                    high: max,
                    low: min,
                    height: '250px',
                    axisX: {
                        labelInterpolationFnc: function(value, index) {
                            return index % 2 === 0 ? value : null;
                        }
                    }
                }
            })
        };

        const handleSubmit = async (e) =>{
            e.preventDefault();
            if(!moment(e.target.elements.sDate.value,'YYYY-MM-DD').isValid()){
                this.props.callInfoModal('Warning', 'The start date is invalid.');
            }
            else if(!moment(e.target.elements.lDate.value,'YYYY-MM-DD').isValid()){
                this.props.callInfoModal('Warning', 'The last date is invalid.');
            }
            else if(moment(e.target.elements.lDate.value,'YYYY-MM-DD') < moment(e.target.elements.sDate.value,'YYYY-MM-DD')){
                this.props.callInfoModal('Warning', 'The last date is earlier than start!');
            }
            else {
                await this.props.fetchStats(this.props.authorisation.user.companyId, e.target.elements.sDate.value, e.target.elements.lDate.value)
                writeChart();
            }
        };

        const path = "/api/report/"+this.props.authorisation.user.companyId;

        return (
            <div>
            <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FieldTitle text="Show statistics"/>
        <Form.Row>
        <Form.Group as={Col}>
            <Form.Label htmlFor="sDate">Start date</Form.Label>
        <Form.Control required type="text" id="sDate" name="sDate" placeholder="YYYY-MM-DD"/>
            <Form.Control.Feedback type="invalid">
            Please, enter start date
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label htmlFor="lDate">Last date</Form.Label>
        <Form.Control required type="text" id="lDate" name="lDate" placeholder="YYYY-MM-DD"/>
            <Form.Control.Feedback type="invalid">
            Please, enter last date.
        </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
            </div>

            <div id="stats">
            <ChartistGraph data={this.state.statsData} options={this.state.options} type={type} />
        </div>

        <Form method="post" action={path} style={{display: this.props.report.start === null ? 'none' : 'block' }}>
    <Button variant="primary" type="submit">
            Generate a report
        </Button>
        <input type="hidden" name="start" value={this.props.report.start}/>
        <input type="hidden" name="finish" value={this.props.report.finish}/>
        </Form>
        </div>
    );
    }
}

export const setValid =(flag) => {
    return async dispatch => {
        if(flag){
            dispatch(setValidTrue());
        }
        else {
            dispatch(setValidFalse());
        }
    }
};

export const fetchStats = (companyId, startDate, lastDate) => {
    return async dispatch => {
        dispatch(setLoadingTrue());
        try {
            const stats = await ReportService.getStats(companyId, startDate, lastDate);
            dispatch(setLoadingFalse());
            dispatch(setNewStats(stats));
        } catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
        }
    }
};

export const setFirstDay = day => {
    return async dispatch => {
        dispatch(setStartDay(day));
    }
};

export const setLastDay = day => {
    return async dispatch => {
        dispatch(setFinishDay(day));
    }
};

export const callInfoModal =(header, message) => {
    return async dispatch => {
        dispatch(showModal(header, message));
    }
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        callInfoModal: (header, message) => dispatch(callInfoModal(header, message)),
        setValid: (flag) => dispatch(setValid(flag)),
        fetchStats: (companyId, startDate, lastDate) => dispatch(fetchStats(companyId, startDate, lastDate)),
        setFirstDay: (day) => dispatch(setFirstDay(day)),
        setLastDay: (day) => dispatch(setLastDay(day))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
