import {CREATE_CELLS_SUCCESS} from "./action";

const initialState = {
    cells: [
        {
            stockId: null,
            storageCondition: "HEATED",
            volume: null,
            cellsCount: null,
            cellPrice: null
        },
        {
            stockId: null,
            storageCondition: "NOT_HEATED",
            volume: null,
            cellsCount: null,
            cellPrice: null
        },
        {
            stockId: null,
            storageCondition: "FREEZER",
            volume: null,
            cellsCount: null,
            cellPrice: null
        },
        {
            stockId: null,
            storageCondition: "OUTDOOR",
            volume: null,
            cellsCount: null,
            s: null
        }
    ]
};

const cellsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CELLS_SUCCESS:
            return {
                ...state,
                cells: action.createdCells
            };
        default:
            return state;
    }
};

export default cellsReducer;
