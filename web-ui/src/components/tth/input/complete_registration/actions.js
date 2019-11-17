export const SET_ACCOMMODATION_COMPLETE = "tth/input/complete_registration/SET_ACCOMMODATION_COMPLETE";
export const CHOOSE_CELL_FOR_GOOD = "tth/input/complete_registration/CHOOSE_CELL_FOR_GOOD";
export const RECEIVE_CELLS="tth/input/complete_registration/RECEIVE_CELLS";
export const SET_SENT ="tth/input/complete_registration/SET_SENT";

export const setAccommodationComplete = (accommodationComplete) => {
    return {
        type: SET_ACCOMMODATION_COMPLETE,
        accommodationComplete
    }
};

export const chooseCellGood = (oldCellId, newCellId, good) =>{
    return{
        type:CHOOSE_CELL_FOR_GOOD,
        oldCellId,
        newCellId,
        good
    }
};

export const receiveCells = (cells) =>{
    return{
        type: RECEIVE_CELLS,
        cells
    }
};

export const setSent = (sent) => {
    return{
        type: SET_SENT,
        sent
    }
};
