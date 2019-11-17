export const CREATE_USER_SUCCESS = "user/CREATE_USER_SUCCESS";
export const SET_NEW_USER_PROPS = "user/SET_NEW_USER_PROPS";

export const receiveUserCreateResult = createdUser => {
    return {
        type: CREATE_USER_SUCCESS,
        createdUser
    };
};

export const setNewUserProps = user =>{
    return{
        type: SET_NEW_USER_PROPS,
        user
    };
};
