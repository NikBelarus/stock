export const LOG_OUT = "authorisation/LOG_OUT";
export const LOG_IN = "authorisation/LOG_IN";

export const logIn = (loginInfo) => {
    return {
        type: LOG_IN,
        payload: {
            user: loginInfo.user,
            accessToken: loginInfo.accessToken,
            tokenType: loginInfo.tokenType
        }
    }
};
export const logOut = () => {
    return {
        type: LOG_OUT
    }
};


