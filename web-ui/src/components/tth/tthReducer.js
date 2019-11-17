import {ADD_GOOD_TO_TTH, RECEIVE_TTH_DATA, RESET_GOODS, SET_READY, SET_REGISTERED_GOODS} from "./actions";

const initialState = {
    goods: [],
    ready: false,
    tth: {
        id: null,
        type:"",
        registrationDate: '',
        dispatcher: {},
        controller:{},
        manager:{},
        status:"",
        carrier: {},
        driver: {},
        vehicleType: {},
        consignmentDescription: "",
        numberInCompany:"",
        goods: []
    }

};

const tthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOOD_TO_TTH:
            let newGoods = state.goods;
            newGoods.push(action.good);
            return {
                ...state,
                goods: newGoods
            };
        case RECEIVE_TTH_DATA:
            const tth = action.tth;
            return {
                ...state,
                tth: {
                    ...state.tth,
                    ...action.tth,
                    goodsCount: new Array(action.tth.goods.length),
                },
                verifiedTth: {
                    id: tth.id,
                    goods: tth.goods,
                }
            };
        case SET_REGISTERED_GOODS:
            return {
                ...state,
                tth:{
                    ...state.tth,
                    goods: action.goods
                }
            };
        case RESET_GOODS:
            return {
                ...state,
                goods: []
            };
        case SET_READY:
            return {
                ...state,
                ready: action.ready
            };
        default:
            return state;
    }
};

export default tthReducer;
