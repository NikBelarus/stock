export const RECEIVE_INPUT_REGISTERED_TTH_LIST = "tth/links-pages/RECEIVE_INPUT_REGISTERED_TTH_LIST";
export const RECEIVE_OUTPUT_REGISTERED_TTH_LIST = "tth/links-pages/RECEIVE_OUTPUT_REGISTERED_TTH_LIST";
export const RECEIVE_INPUT_VERIFIED_TTH_LIST = "tth/links-pages/RECEIVE_INPUT_VERIFIED_TTH_LIST";
export const RECEIVE_OUTPUT_VERIFIED_TTH_LIST = "tth/links-pages/RECEIVE_OUTPUT_VERIFIED_TTH_LIST";

export const receiveInputRegisteredTthList = (list) =>{
    return {
        type: RECEIVE_INPUT_REGISTERED_TTH_LIST,
        list
    }
};

export const receiveOutputRegisteredTthList = (list) =>{
    return {
        type: RECEIVE_OUTPUT_REGISTERED_TTH_LIST,
        list
    }
};

export const receiveInputVerifiedList = (list) => {
    return {
        type: RECEIVE_INPUT_VERIFIED_TTH_LIST,
        list
    }
};

export const receiveOutputVerifiedList = (list) => {
    return {
        type: RECEIVE_OUTPUT_VERIFIED_TTH_LIST,
        list
    }
};
