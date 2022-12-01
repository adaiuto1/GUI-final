import axios from 'axios';
const apiEndpoint = 'http://ec2-54-172-10-241.compute-1.amazonaws.com:8000';

export const createProfile = (profile) =>{
    axios.post(`${apiEndpoint}/profiles/`, profile);
}
export const getProfileById = (id) =>{
   return axios.get(`${apiEndpoint}/profiles/${id}`).then(x=>x.data)
}
