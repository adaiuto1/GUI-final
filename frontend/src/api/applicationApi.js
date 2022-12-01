import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = 'https://fmflb-224718001.us-east-1.elb.amazonaws.com:444';

export const getApplications = () => new Promise((resolve, reject) => {
    return axios.get(`${apiEndpoint}/application`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const addApplication = body => {
    axios.post(`${apiEndpoint}/application`, body).then(x=>{
        console.log(x);
        
    })
};
export const putApplication = (id, editedApp) => new Promise((resolve, reject)=>{
    axios.put(`${apiEndpoint}/application/${id}`, editedApp)
})