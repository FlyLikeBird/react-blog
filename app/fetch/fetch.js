import axios from 'axios'

let config = {
    baseURL: '/api',
    /*   
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    */
    timeout: 10000,
    responseType: 'json'
};

export function get(url) {
    return axios.get(url, config).then(response=>response.data);
}

export function post(url, data) {
    return axios.post(url, data, config).then(response=>response.data);
}