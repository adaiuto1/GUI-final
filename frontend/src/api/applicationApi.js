import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = 'http://ec2-54-172-10-241.compute-1.amazonaws.com:8000';

export const getApplications = () => new Promise((resolve, reject) => {
    return axios.get(`${apiEndpoint}/applications`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const addApplication = body => axios.post(`${apiEndpoint}/application`, body);