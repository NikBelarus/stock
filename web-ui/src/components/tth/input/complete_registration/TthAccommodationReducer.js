import {CHOOSE_CELL_FOR_GOOD, RECEIVE_CELLS, SET_ACCOMMODATION_COMPLETE, SET_SENT} from "./actions";
import {RECEIVE_TTH_DATA} from "../../actions";

const initialState = {
    goods: [],
    totalGoods: [],
    cells: [],
    accommodationComplete: false,
    sent: false
};

 const tthAccommodationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case RECEIVE_CELLS:
            return{
                ...state,
                cells: action.cells,
            };
        case SET_ACCOMMODATION_COMPLETE:
            return {
                ...state,
                accommodationComplete: action.accommodationComplete
            };
        case CHOOSE_CELL_FOR_GOOD:
            let chosenGood = state.goods.find(good => good.id === action.good.id);
            chosenGood.cellId = action.newCellId;
            let chosenCell = state.cells.find(cell => cell.id === +action.newCellId);
            chosenCell.freeVolume -= +chosenGood.volume;
            chosenGood.cellName = chosenCell.name;
            let oldCell = state.cells.find(cell => cell.id === +action.oldCellId);
            if(oldCell) {
                oldCell.freeVolume += +chosenGood.volume;
            }
            return {
                ...state,
            };
        case RECEIVE_TTH_DATA:
            return {
                ...state,
                totalGoods: action.tth.goods,
                goods: action.tth.goods
            };
        case SET_SENT:
            return {
                ...state,
                sent: action.sent
            };
        default:
            return state;
    }
};
 export default tthAccommodationReducer;




