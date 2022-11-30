import axios from 'axios';
const apiEndpoint = '//localhost:8000';

export const getProperties = () => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/getallproperties`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const addProperty = (property) => new Promise ((resolve, reject) => { //FIXME not working
    console.log(property)

    axios.post(`${apiEndpoint}/property`, property)
    .then(x => resolve(x.data))
    .catch(x => {
        console.log('Caught x');
        alert(x);
        reject(x);
    });
});

export const getPropertyById = (id) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/property/${id}`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const getSomeProperties = (searchQuery) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/getallproperties`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
