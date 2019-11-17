export const RECEIVE_CARRIERS_LIST = "carriage/RECEIVE_CARRIERS_LIST";
export const SELECT_CARRIER = "carriage/SELECT_CARRIER";

export const RECEIVE_DRIVERS_LIST = "carriage/RECEIVE_DRIVERS_LIST";
export const SELECT_DRIVER = "carriage/SELECT_DRIVER";

export const SELECT_VEHICLE_TYPE = "carriage/SELECT_VEHICLE_TYPE";
export const RESET_CARRIAGE ="carriage/RESET_CARRIAGE";

export const TYPE_VEHICLE_NO = "carriage/TYPE_VEHICLE_NO";

export const receiveCarriersList = list => {
    return {
        type: RECEIVE_CARRIERS_LIST,
        list
    };
};

export const receiveDriversList = list => {
    return {
        type: RECEIVE_DRIVERS_LIST,
        list
    };
};

export const selectCarrier = carrier => {
    return {
        type: SELECT_CARRIER,
        carrier
    }
};

export const selectDriver = driver => {
    return {
        type: SELECT_DRIVER,
        driver
    }
};

export const selectVehicleType = vehicleType => {
    return {
        type: SELECT_VEHICLE_TYPE,
        vehicleType
    }
};

export const resetCarriage = () => {
    return {
        type: RESET_CARRIAGE
    }
};

export const typeVehicleNo =(no) => {
    return {
        type: TYPE_VEHICLE_NO,
        no
    }
};
