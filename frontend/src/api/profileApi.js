import axios from 'axios';
const apiEndpoint = '//localhost:8000';

export const createProfile = (profile) =>{
    axios.post(`${apiEndpoint}/profiles/`, profile);
}
export const getProfileById = (id) =>{
   return axios.get(`${apiEndpoint}/profiles/${id}`).then(x=>x.data)
}
export const editProfile = (id, newProf) =>{
    return axios.put(`${apiEndpoint}/profiles/${id}`, newProf)
 }
export const deleteProfile = (id) =>{
    return axios.delete(`${apiEndpoint}/profiles/${id}`)
}