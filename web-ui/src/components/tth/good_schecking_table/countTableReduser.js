import {
    RESET_CHECKING_TABLE,
    SET_GOOD_REAL_COUNT, SET_GOODS,
    SET_VERIFICATION_STATUS, SET_VERIFIED_GOODS
} from "./actions";
import {DATA_FILLING} from "../verification/TthVerificationStatuses";

const initialState = {
    verificationStatus: DATA_FILLING,
    goods: [],
    verifiedGoods: [],
    goodsCount: []
};

const countTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GOOD_REAL_COUNT:
            let realGoodCount = state.goodsCount;
            realGoodCount[action.row] = action.count;
            return {
                ...state,
                realGoodCount: realGoodCount
            };
        case SET_VERIFICATION_STATUS:
            return {
                ...state,
                verificationStatus: action.status
            };
        case SET_VERIFIED_GOODS:
            return  {
                ...state,
                verifiedGoods: action.goods
            };
        case SET_GOODS:
            return {
                ...state,
                goods: action.goods
            };
        case RESET_CHECKING_TABLE:
            return initialState;
        default:
            return state;
    }
};
export default countTableReducer;
