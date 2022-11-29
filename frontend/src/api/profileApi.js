import axios from 'axios';
import { useContext } from 'react';
const apiEndpoint = '//localhost:8000';

export const createProfile = (profile, id) =>{
    axios.post(`${apiEndpoint}/profile/${id}`, profile);
}
export const getProfileById = (id) =>{
   return axios.get(`${apiEndpoint}/profiles/${id}`).then(x=>x.data)
}