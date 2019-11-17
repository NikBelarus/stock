export const PAGE_SUCCESS ="basecomponents/table/PAGE_SUCCESS";
export const TABLE_CHANGE_PAGE_SIZE ="basecomponents/table/TABLE_CHANGE_PAGE_SIZE";
export const TABLE_CHANGE_PAGE="basecomponents/table/TABLE_CHANGE_PAGE";
export const ADD_ROW_TO_DELETE="basecomponents/table/ADD_ROW_TO_DELETE";
export const ADD_ALL_ROW_TO_DELETE="basecomponents/table/ADD_ALL_ROW_TO_DELETE";
export const DELETE_FROM_TABLE_CONTENT="basecomponents/table/DELETE_FROM_TABLE_CONTENT";

export const receivePageInfo = pageInfo =>{
    return{
        type:PAGE_SUCCESS,
        pageInfo
    }
};

export const changePage = (number, size) => {
    return{
        type:TABLE_CHANGE_PAGE,
        number,
        size
    }
};

export const addToDelete = (row, isSelected) =>{
    return{
        type: ADD_ROW_TO_DELETE,
        row,
        isSelected
    }
};

export const addToDeleteAll = (isSelect, rows) =>{
    return{
        type:ADD_ALL_ROW_TO_DELETE,
        isSelect,
        rows
    }
};

export const deleteFromTableContent = id =>{
    return{
        type:DELETE_FROM_TABLE_CONTENT,
        id
    }
};



