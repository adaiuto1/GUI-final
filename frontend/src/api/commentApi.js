import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = 'https://fmflb-224718001.us-east-1.elb.amazonaws.com:444';
export const getCommentsByProperty = (id) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/comment/${id}`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
export const createComment = (comment) =>{
    console.log(comment)
    axios.post(`${apiEndpoint}/comment`, comment);
}
export const deleteComment = (id)=>{
    return axios.delete(`${apiEndpoint}/comment/${id}`)
}