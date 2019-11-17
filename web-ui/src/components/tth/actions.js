export const ADD_GOOD_TO_TTH ="tth/ADD_GOOD_TO_TTH";
export const RECEIVE_TTH_DATA ="tth/RECEIVE_TTH_DATA";
export const SET_REGISTERED_GOODS ="tth/input/verification/SET_REGISTERED_GOODS";
export const RECEIVE_REGISTERED_TTH_DATA ="tth/RECEIVE_REGISTERED_TTH_DATA";
export const SET_TTH_STATUS="tth/SET_TTH_STATUS";
export const CHANGE_CONSIGNMENT_TYPE_FOR_INFO_TABLE ="tthInfoTable/CHANGE_CONSIGNMENT_TYPE_FOR_INFO_TABLE";
export const SET_SELECTED_TTH ="tthInfoTable/SET_SELECTED_TTH";
export const RESET_GOODS ="tth/RESET_GOODS";
export const SET_READY ="tth/SET_READY";

export const setRegisteredGoods =(goods) => {
    return {
        type: SET_REGISTERED_GOODS,
        goods
    };
};

export const setTTHStatus = (status) =>{
    return {
        type: SET_TTH_STATUS,
        status
    }
};

export const  addGoodToTth = (good) =>{
    return{
        type: ADD_GOOD_TO_TTH,
        good
    }
};

export const receiveTthData = (tth) =>{
    return{
        type: RECEIVE_TTH_DATA,
        tth
    }
};

export const changeConsTypeForInfoTable = (consType) =>{
    return{
        type: CHANGE_CONSIGNMENT_TYPE_FOR_INFO_TABLE,
        consType: consType
    }
};

export const setSelectedTTH = (tth) =>{
    return{
        type: SET_SELECTED_TTH,
        tth: tth
    }
};

export const resetGoods = () =>{
    return{
        type: RESET_GOODS
    }
};

export const setReady = (ready) => {
    return{
        type:SET_READY,
        ready
    }
}
