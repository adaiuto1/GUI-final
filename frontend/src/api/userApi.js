import axios from "axios";
const apiEndpoint = 'http://localhost:8000';

export const getUsers = () => {
    return axios.get(`${apiEndpoint}/users`).then(x => x.data);
}

export const getUser = id => {
    return axios.get(`${apiEndpoint}/users/id`).then(x => x.data);
}

export const createUser = body => {
    debugger;
    return axios.post(`${apiEndpoint}/user`, body)
    .then(x => x.data)
    .catch(error => console.log(error));
}