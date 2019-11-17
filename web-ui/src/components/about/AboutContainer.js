import {connect} from "react-redux";
import React from "react";

import {FieldTitle} from "../basecomponents/content/FieldTitle";
import Loading from "../loading/Loading";
import {receiveAboutInfo} from "./actions";
import AboutService from "./AboutService";
import InfoModalContainer from "../info_modal/InfoModalContainer";
import {showModal} from "../info_modal/actions";
import {setLoadingFalse, setLoadingTrue} from "../loading/actions";

class AboutContainer extends React.Component {

	componentDidMount() {
		this.props.fetchAboutInfo();
	}

	render() {
		const {info} = this.props.about;
        const {isShown} = this.props.modal;
        const {loading} = this.props.loading;
        if (loading) {
            return <Loading/>;
        }
        if (isShown) {
            return <InfoModalContainer/>
        }
		return (
			<article>
				<FieldTitle text="About"/>
				<p>
					Application name : {info.name}
				</p>
				<p>
					Application version : {info.version}
				</p>
				<p>
					Application development group : {info.groupName}
				</p>
			</article>
		);
	}
}

export const fetchAboutInfo = () => {
	return async dispatch => {
		dispatch(setLoadingTrue());
		try {
			const aboutInfo = await AboutService.getAbout();
			dispatch(setLoadingFalse());
			dispatch(receiveAboutInfo(aboutInfo));
		} catch (e) {
            dispatch(setLoadingFalse());
            dispatch(showModal('Error', e.message));
		}
	};
};

const mapStateToProps = state => {
	return {
	    ...state,
		info: state.about.info
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchAboutInfo: () => dispatch(fetchAboutInfo())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
