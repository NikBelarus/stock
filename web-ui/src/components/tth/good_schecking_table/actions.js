export const SET_GOOD_REAL_COUNT="tth/SET_GOOD_REAL_COUNT";
export const SET_VERIFICATION_STATUS = "tth/input/verification/SET_VERIFICATION_STATUS";
export const SET_VERIFIED_GOODS = "tth/input/verification/SET_VERIFIED_GOODS";
export const SET_GOODS = "good_checking_table/SET_GOODS";
export const RESET_CHECKING_TABLE ="good_checking_table/RESET_CHECKING_TABLE";


export const setVerificationStatus = (status) =>{
    return {
        type: SET_VERIFICATION_STATUS,
        status
    }
};


export const setGoodRealCount = (row, count) =>{
    return{
        type: SET_GOOD_REAL_COUNT,
        row,
        count
    }
};

export const setVerifiedGoods = (goods) => {
    return{
        type: SET_VERIFIED_GOODS,
        goods
    }
};

export const setGoods = (goods) => {
    return{
        type: SET_GOODS,
        goods
    }
};

export const resetCheckingTable = () =>{
    return {
        type: RESET_CHECKING_TABLE
    }
};
