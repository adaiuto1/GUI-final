import axios from 'axios';
const apiEndpoint = '//localhost:8000';

export const getProperties = () => {
    return axios.get(`${apiEndpoint}/users`).then(x => x.data); //FIXME fix
}

export const getSomeProperties = (searchQuery) => {
    return axios.get(`${apiEndpoint}/users/id`).then(x => x.data); //FIXME fix
}

