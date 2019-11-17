export const ABOUT_INFO_SUCCESS = "about/ABOUT_INFO_SUCCESS";

export const receiveAboutInfo = aboutInfo => {
	return {
		type: ABOUT_INFO_SUCCESS,
		aboutInfo
	};
};
