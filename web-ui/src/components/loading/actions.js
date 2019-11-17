export const LOADING_TRUE = "loading/LOADING_TRUE";
export const LOADING_FALSE = "loading/LOADING_FALSE";

export const setLoadingTrue = () => {
    return {
        type: LOADING_TRUE
    };
};

export const setLoadingFalse = () => {
    return {
        type: LOADING_FALSE
    };
};
