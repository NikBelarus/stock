import {store} from '../store';

export default function sendRequest(path, methodName = 'GET', requestBody = null) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const state = store.getState();
    const accessToken = state.authorisation.accessToken;
    const tokenType = state.authorisation.tokenType;

    path = window.location.origin + "/" + path;
    if (accessToken && tokenType) {
        headers.append("Authorization", tokenType + " " + accessToken);
    }
    return fetch(path, {
        headers: headers,
        method: methodName,
        body: requestBody
    })
}
