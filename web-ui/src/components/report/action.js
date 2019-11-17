export const SET_NEW_STATS = "stats/SET_NEW_STATS";
export const SET_START_DAY = "stats/SET_START_DAY";
export const SET_FINISH_DAY = "stats/SET_FINISH_DAY";

export const setNewStats = stats =>{
    return{
        type: SET_NEW_STATS,
        stats
    };
};

export const setStartDay = day =>{
    return{
        type: SET_START_DAY,
        day: day
    };
};

export const setFinishDay = day =>{
    return{
        type: SET_FINISH_DAY,
        day: day
    };
};
