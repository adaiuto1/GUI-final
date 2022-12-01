import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = '//localhost:8000';
export const getCommentsByProperty = (id) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/comment/${id}`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const getAllComments = () => new Promise ((resolve, reject)=>{
    axios.get(`${apiEndpoint}/comment`)
    .then(x=>resolve(x.data))
})
export const createComment = (comment) =>{
    console.log(comment)
    axios.post(`${apiEndpoint}/comment`, comment);
}
export const deleteComment = (id)=>{
    return axios.delete(`${apiEndpoint}/comment/${id}`)
}