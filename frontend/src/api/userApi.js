import axios from 'axios';
import { useContext } from 'react';
const apiEndpoint = 'http://ec2-54-172-10-241.compute-1.amazonaws.com:8000';


export const getUsers = () => {
    return axios.get(`${apiEndpoint}/users`).then(x => x.data);
}

export const getUserById = id => {
    return axios.get(`${apiEndpoint}/users/${id}`).then(x => x.data);
}

export const getUserByUsername = username => axios.get(`${apiEndpoint}/users?username=${username}`);

export const createUser = body => axios.post(`${apiEndpoint}/users`, body);
