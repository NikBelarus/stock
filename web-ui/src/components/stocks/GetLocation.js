import axios from "axios";

class GetLocation {
    async getGeo(addressObj) {
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: addressObj,
                key: "AIzaSyDKntSgImLzFZUxmhE2gwMJVtHF7uFHJ9g"
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default new GetLocation();
