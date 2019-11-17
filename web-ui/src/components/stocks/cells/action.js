export const CREATE_CELLS_SUCCESS = "cells/CREATE_CELLS_SUCCESS";

export const receiveCellsCreateResult = createdCells => {
    return {
        type: CREATE_CELLS_SUCCESS,
        createdCells
    };
};