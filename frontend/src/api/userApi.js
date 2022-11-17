import axios from 'axios';
import { useContext } from 'react';
const apiEndpoint = '//localhost:8000';


export const getUsers = () => {
    return axios.get(`${apiEndpoint}/users`).then(x => x.data);
}

export const getUser = id => {
    return axios.get(`${apiEndpoint}/users/id`).then(x => x.data);
}

export const createUser = body => {
    console.log(body);
    axios.post(`${apiEndpoint}/users`, body)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}