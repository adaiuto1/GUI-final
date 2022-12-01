import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = '//localhost:8000';
export const getCommentsByProperty = (id) => new Promise((resolve, reject)=>{
    return axios.get(`${apiEndpoint}/comment/${id}`)
    .then(x=>{
        resolve(x);
    }).catch(x=>{
        alert(x);
        reject(x)
    });
})
export const createComment = (comment) => new Promise((resolve, reject) =>{
    return axios.post(`${apiEndpoint}/comment`, comment)
    .then(x=>{
        resolve(x);
    }).catch(x=>{
        alert(x);
        reject(x)
    });

})

export const deleteComment = (id)=>{
    return axios.delete(`${apiEndpoint}/comment/${id}`)
}