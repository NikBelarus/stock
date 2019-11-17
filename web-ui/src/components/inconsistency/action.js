export const CHOOSE_INCONSISTENCY ="inconsistency/CHOOSE_INCONSISTENCY";

export const chooseInconsistency = actId => {
    return{
        type: CHOOSE_INCONSISTENCY,
        actId
    }
};
