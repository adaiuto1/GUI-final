import axios from 'axios';
const apiEndpoint = 'https://fmflb-224718001.us-east-1.elb.amazonaws.com:444';

export const createProfile = (profile) =>{
    axios.post(`${apiEndpoint}/profiles/`, profile);
}
export const getProfileById = (id) =>{
   return axios.get(`${apiEndpoint}/profiles/${id}`).then(x=>x.data)
}
export const editProfile = (id, newProf) =>{
    console.log('Editing profile')
    console.log(id)
    console.log(newProf)
    return axios.put(`${apiEndpoint}/profiles/${id}`, newProf)
 }
export const deleteProfile = (id) =>{
    return axios.delete(`${apiEndpoint}/profiles/${id}`)
}