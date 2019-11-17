import {
    ADD_ALL_ROW_TO_DELETE,
    ADD_ROW_TO_DELETE, DELETE_FROM_TABLE_CONTENT,
    PAGE_SUCCESS,
    TABLE_CHANGE_PAGE,
    TABLE_CHANGE_PAGE_SIZE
} from "./actions";
import {RESET_CONTENT} from "../actions";

const initialState = {
    page: {
        content: [],
        number: 1,
        size: 5,
        totalElements: 0,
        totalPages: 0,
    },
    toDelete: []
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_SUCCESS:
            return {
                ...state,
                page: {
                    ...action.pageInfo,
                    number: action.pageInfo.number + 1
                }
            };
        case TABLE_CHANGE_PAGE:
            return {
                ...state,
                page: {
                    ...state.page,
                    number: action.number,
                    size: action.size
                }
            };
        case TABLE_CHANGE_PAGE_SIZE:
            return {
                ...state,
                page: {
                    ...state.page,
                    number: 0,
                    size: action.size
                }
            };
        case ADD_ROW_TO_DELETE:
            if (action.isSelected) {
                return {
                    ...state,
                    toDelete: [...state.toDelete,
                        action.row]
                }
            } else {
                return {
                    ...state,
                    toDelete: state.toDelete.filter(x => x.id !== action.row.id)
                }
            }
        case ADD_ALL_ROW_TO_DELETE:
            if (action.isSelect) {
                return {
                    ...state,
                    toDelete: action.rows
                }
            } else {
                return {
                    ...state,
                    toDelete: []
                }
            }
        case DELETE_FROM_TABLE_CONTENT:
            const content = state.page.content.filter(row => row.id !== action.id);
            return{
                ...state,
                page: {
                    ...state.page,
                    content: content
                }
            };
        case RESET_CONTENT:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default tableReducer;
