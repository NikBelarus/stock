export const CHOOSE_CANCELLATION ="cancellation/CHOOSE_CANCELLATION";

export const chooseCancellation = actId => {
    return{
        type: CHOOSE_CANCELLATION,
        actId
    }
};
