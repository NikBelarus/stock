export const CREATE_CARRIER_SUCCESS = "carriers/CREATE_CARRIER_SUCCESS";

export const receiveCarrierCreateResult = createdCarrier => {
    return {
        type: CREATE_CARRIER_SUCCESS,
        createdCarrier
    };
};
