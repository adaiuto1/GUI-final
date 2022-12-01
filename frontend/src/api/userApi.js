import axios from 'axios';
import { useContext } from 'react';
const apiEndpoint = 'https://fmflb-224718001.us-east-1.elb.amazonaws.com:444';


export const getUsers = () => {
    return axios.get(`${apiEndpoint}/users`).then(x => x.data);
}

export const getUserById = id => {
    return axios.get(`${apiEndpoint}/users/${id}`).then(x => x.data);
}
export const deleteUser = (id) =>{
    return axios.delete(`${apiEndpoint}/users/${id}`)
}
export const getUserByUsername = username => axios.get(`${apiEndpoint}/users?username=${username}`);

export const createUser = body => axios.post(`${apiEndpoint}/users`, body);
