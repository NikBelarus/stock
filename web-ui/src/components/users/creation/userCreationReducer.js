import {CREATE_USER_SUCCESS, SET_NEW_USER_PROPS} from "./actions";

const initialState = {
    user: {
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        firstName: "",
        lastName: "",
        parentName: "",
        birthdate: "",
        salary: null,
        city: "",
        street: "",
        house: "",
        appartment: "",
        companyId: null,
        stockId: null
    }
};

const userCreationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createdUser: action.createdUser
            };
        case SET_NEW_USER_PROPS:
            return {
                ...state,
                user:{
                    ...state.user,
                    ...action.user
                }
            };
        default:
            return state;
    }
};

export default userCreationReducer;
