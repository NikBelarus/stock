export const CREATE_DRIVER_SUCCESS = "drivers/CREATE_DRIVER_SUCCESS";

export const receiveDriverCreateResult = createdDriver => {
    return {
        type: CREATE_DRIVER_SUCCESS,
        createdDriver: createdDriver
    };
};
