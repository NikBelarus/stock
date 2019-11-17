import sendRequest from "../globalService";
import {API} from "../../const";

class PaymentService {
    async pay(){
        return sendRequest(API.PAY, 'POST')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}

export default new PaymentService();
