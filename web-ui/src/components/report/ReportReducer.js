import {SET_FINISH_DAY, SET_NEW_STATS, SET_START_DAY} from "./action";

const initialState = {
	stats: [],
    start: null,
    finish: null
};

const reportReducer = (state = initialState, action) =>{
	switch (action.type) {
        case SET_NEW_STATS:
            return {
                ...state,
                stats:{
                    ...state.stats,
                    ...action.stats
                }
            };
        case SET_START_DAY:
            return {
                ...state,
                start: action.day
            };
        case SET_FINISH_DAY:
            return {
                ...state,
                finish: action.day
            };
        default:
            return state;
    }
};

export default reportReducer;
