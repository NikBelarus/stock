export const VALIDATED_TRUE = "validation/VALIDATED_TRUE";
export const VALIDATED_FALSE = "validation/VALIDATED_FALSE";

export const setValidTrue = () => {
    return {
        type: VALIDATED_TRUE
    };
};

export const setValidFalse = () => {
    return {
        type: VALIDATED_FALSE
    };
};
