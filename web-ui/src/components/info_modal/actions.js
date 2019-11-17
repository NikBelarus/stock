export const SHOW_MODAL = "modal/SHOW_MODAL";
export const HIDE_MODAL = "modal/HIDE_MODAL";

export const showModal = (header, message) => {
    return {
        type: SHOW_MODAL,
        payload: {
            header: header,
            message: message
        }
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    };
};
