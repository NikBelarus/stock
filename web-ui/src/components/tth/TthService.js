import {API} from "../../const";
import sendRequest from "../globalService";
import {store} from "../../store";

class TthService {
    async fetchCreateInput(tth) {
        return sendRequest(API.TTH+"/input", 'POST', JSON.stringify(tth))

            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }
    async fetchCreateOutput(tth) {
        return sendRequest(API.TTH+"/output", 'POST', JSON.stringify(tth))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }

    async fetchGetAllConsignmentsForCompany() {
        let URL = API.TTH;
        if(store.getState().tthInfoTable.consignmentType !== null) {
            URL += "?type=" + store.getState().tthInfoTable.consignmentType;
        }
        return sendRequest(URL)
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }
    async fetchTth(id) {
        return sendRequest(API.TTH+'/'+id)
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }

    async fetchVerifiedTth(tth) {
        return sendRequest(API.THH_VERIFICATION, 'PUT', JSON.stringify(tth))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }

    async completeTthRegistration(tth) {
        return sendRequest(API.TTH_REGISTRATION, 'PUT',JSON.stringify(tth))
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }

    async fetchActiveNotes(status, type) {
        return sendRequest(API.TTH +"/active?status="+status+"&type="+type)
            .then(function (response) {
                if(response.ok) {
                    return response.json();
                } else{
                    throw new Error(response.message)
                }            })
            .then(data => {
                return data;
            });
    }
}

export default new TthService();
