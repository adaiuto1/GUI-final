import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
const apiEndpoint = '//localhost:8000';
export const getCommentsByProperty = (id) =>{
    return axios.get(`${apiEndpoint}/comment/${id}`)
}
export const createComment = (comment) =>{
    axios.post(`${apiEndpoint}/comment`, comment);
}
export const deleteComment = (id)=>{
    return axios.delete(`${apiEndpoint}/comment/${id}`)
}